import _ from 'lodash';
import Promise from 'bluebird';
import sanitize from 'utils/sanitize';

import { Recipe } from 'models/recipe';
import { RecipeOil } from 'models/recipeOil';



export default class {

    constructor( payload ) {
        this.payload = _.extend( {}, payload.recipe, {
            user_id: payload.userId
        } );

        this.recipe = null;
        this.recipeOils = null;
    }

    execute() {
        return Promise.method( sanitizeNotes ).call( this )
            .bind( this )
            .then( saveRecipe )
            .then( setRecipe )
            .then( buildRecipeOilsRelation )
            .then( returnRecipe );
    }
}

////////////////////
///// private

function sanitizeNotes() {
    this.payload.notes = sanitize( this.payload.notes );
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
    function createRecipeOil( oilId ) {
        return RecipeOil.forge( {
            recipe_id: this.recipe.get( 'id' ),
            oil_id: oilId,
            weight: Number( this.payload.weights[ oilId ] )
        } )
            .save();
    }

    return Promise.each( this.payload.oils, createRecipeOil.bind( this ) );
}

function returnRecipe() {
    return this.recipe;
}

