import _ from 'lodash';
import sanitize from 'utils/sanitize';
import Promise from 'bluebird';

import { Feedable, Feedables } from 'models/feedable';
import { Image } from 'models/image';
import { Recipe } from 'models/recipe';


export default class {

    constructor( payload ) {
        this.id = payload.id;
        this.payload = _.extend( {}, payload.recipe, {
            user_id: Number( payload.userId )
        } );
        this.payload = _.omit( this.payload, 'deleting' );
        this.deleting = payload.recipe.deleting;

        this.recipe = null;
        this.recipeOils = null;
    }

    execute() {
        return getRecipeFromDatabase.call( this )
            .bind( this )
            .then( setRecipe )
            .then( sanitizeInputs )
            .then( saveAsNewForUserOrUpdateRecipe )
            .then( fetchRecipeUser )
            .then( setRecipe )
            .then( buildRecipeOilsRelation )
            .then( createFeedableEntryIfPublic )
            .then( deleteImagesIfRequired )
            .then( returnRecipe );
    }
}

////////////////////
///// private

function getRecipeFromDatabase() {
    return Recipe
        .forge( { id: this.id } )
        .fetch();
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function sanitizeInputs() {
    this.payload.notes = sanitize( this.payload.notes );
    this.payload.description = sanitize( this.payload.description );
}

/**
 * check the owner of this.recipe vs this.payload.user_id.
 * If they match, update; otherwise create a new recipe for the session user
 */
function saveAsNewForUserOrUpdateRecipe() {
    let payload = _.omit( this.payload, 'oils', 'weights' );
    let isRecipeOwner = Number( this.recipe.get( 'user_id' ) ) === Number( this.payload.user_id );

    if ( isRecipeOwner ) {
        return this.recipe.save( payload, { patch: true } );
    } else {
        return Recipe
            .forge( payload )
            .save();
    }
}

function fetchRecipeUser( recipe ) {
    return recipe.fetch( {
        withRelated: [ 'user' ]
    } );
}

function buildRecipeOilsRelation() {

    return this.recipe.oils()
        .detach()
        .then( attachOils.bind( this ) );


    function attachOils() {
        let pivot = _.map( this.payload.weights, ( weight, oilId ) => {
            return {
                oil_id: oilId,
                created_at: new Date(),
                weight
            };
        } );

        return this.recipe.oils().attach( pivot );
    }


}

/**
 * Creates a feedable entry if this recipe is public and the last three feedable entries do not contain this recipe
 */
function createFeedableEntryIfPublic() {

    if ( Number( this.recipe.get( 'visibility' ) ) === 1 ) {
        return lastFeedableEntries.call( this )
            .then( createFeedable.bind( this ) );
    }


    function lastFeedableEntries() {
        return Feedables
            .query( qb => {
                qb
                    .select( 'id', 'feedable_id', 'feedable_type' )
                    .orderBy( 'id', 'desc' )
                    .limit( 3 );
            } )
            .fetch()
            .then( filterAndExtractFeedableIds )
    }

    function filterAndExtractFeedableIds( rows ) {
        return rows
            .chain()
            .filter( row => row.get( 'feedable_type' ) === 'recipes' )
            .map( row => row.get( 'feedable_id' ) )
            .value();
    }

    function createFeedable( previousFeedableIds ) {
        if ( !(_.contains( previousFeedableIds, this.recipe.get( 'id' ) )) ) {
            return Feedable
                .forge( {
                    feedable_id: this.recipe.get( 'id' ),
                    feedable_type: 'recipes',
                    feedable_meta: {
                        user: {
                            id: this.recipe.related( 'user' ).get( 'id' ),
                            name: this.recipe.related( 'user' ).get( 'name' ),
                            image_url: this.recipe.related( 'user' ).get( 'image_url' )
                        },
                        target: {
                            id: this.recipe.get( 'id' ),
                            name: this.recipe.get( 'name' ),
                            actionType: 'updated recipe'
                        }
                    }
                } )
                .save();
        }
    }

}

function deleteImagesIfRequired() {

    if ( _.get( this.deleting, 'imageables.length' ) ) {
        return Promise.resolve( this.deleting.imageables )
            .each( deleteImageable )
    }

    function deleteImageable( imageableId ) {
        return Image
            .forge( {
                id: imageableId,
                imageable_id: this.recipe.get( 'id' )
            } )
            .fetch()
            .then( image => image.destroy() )
    }
}

function returnRecipe() {
    return this.recipe;
}

