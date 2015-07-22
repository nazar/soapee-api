import _ from 'lodash';
import sanitize from 'utils/sanitize';

import { Recipe } from 'models/recipe';


export default class {

    constructor( payload ) {
        this.id = payload.id;
        this.payload = _.extend( {}, payload.recipe, {
            user_id: Number( payload.userId )
        } );

        this.recipe = null;
        this.recipeOils = null;
    }

    execute() {
        return getRecipeFromDatabase.call( this )
            .bind( this )
            .then( setRecipe )
            .then( sanitizeInputs )
            .then( saveAsNewForUserOrUpdateRecipe )
            .then( setRecipe )
            .then( buildRecipeOilsRelation )
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

    if ( this.recipe && Number( this.recipe.get( 'user_id' ) ) === this.payload.user_id ) {
        return this.recipe.save( payload, { patch: true } );
    } else {
        return Recipe
            .forge( payload )
            .save();
    }
}

function buildRecipeOilsRelation() {

    function attachOils(){
        let pivot = _.map( this.payload.weights, ( weight, oilId ) => {
            return {
                oil_id: oilId,
                weight
            };
        } );

        return this.recipe.oils().attach( pivot );
    }

    return this.recipe.oils()
        .detach()
        .then( attachOils.bind( this ) );
}

function returnRecipe() {
    return this.recipe;
}

