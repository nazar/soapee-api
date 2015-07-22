import _ from 'lodash';
import Promise from 'bluebird';
import sanitize from 'utils/sanitize';

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
        .save();
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function buildRecipeOilsRelation() {

    function relatedOils(){
        return _.map( this.payload.weights, ( weight, oilId ) => {
            return {
                oil_id: oilId,
                weight
            };
        } );
    }

    return this.recipe.oils()
        .attach( relatedOils.call( this ) );
}

function returnRecipe() {
    return this.recipe;
}

