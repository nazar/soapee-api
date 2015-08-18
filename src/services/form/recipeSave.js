import _ from 'lodash';
import Promise from 'bluebird';
import sanitize from 'utils/sanitize';

import { Feedable } from 'models/feedable';
import { Recipe } from 'models/recipe';

export default class {

    constructor( payload ) {
        this.payload = _.extend( {}, payload.recipe, {
            user_id: payload.userId
        } );

        this.recipe = null;
        this.recipeOils = null;
    }

    execute() {
        return Promise.method( sanitizeInputs ).call( this )
            .bind( this )
            .then( saveRecipe )
            .then( setRecipe )
            .then( buildRecipeOilsRelation )
            .then( createFeedableEntryIfPublic )
            .then( returnRecipe );
    }
}

////////////////////
///// private

function sanitizeInputs() {
    this.payload.notes = sanitize( this.payload.notes );
    this.payload.description = sanitize( this.payload.description );
}

function saveRecipe() {
    let payload = _.omit( this.payload, 'oils', 'weights' );

    return Recipe
        .forge( payload )
        .save()
        .then( recipe => recipe.fetch( { withRelated: 'user' } ) );
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function buildRecipeOilsRelation() {

    function relatedOils() {
        return _.map( this.payload.weights, ( weight, oilId ) => {
            return {
                oil_id: oilId,
                created_at: new Date(),
                weight
            };
        } );
    }

    return this.recipe.oils()
        .attach( relatedOils.call( this ) );
}

function createFeedableEntryIfPublic() {
    if ( Number( this.recipe.get( 'visibility' ) ) === 1 ) {
        return Feedable
            .forge( {
                feedable_id: this.recipe.get( 'id' ),
                feedable_type: 'recipes',
                feedable_meta: {
                    user: {
                        id: this.recipe.related( 'user' ).get( 'id' ),
                        name: this.recipe.related( 'user' ).get( 'name' )
                    },
                    target: {
                        id: this.recipe.get( 'id' ),
                        name: this.recipe.get( 'name' ),
                        actionType: 'added a new recipe'
                    }
                }
            } )
            .save();
    }
}

function returnRecipe() {
    return this.recipe;
}

