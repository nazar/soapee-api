import NotAuthorisedError from 'exceptions/notAuthorised';

import { Recipe } from 'models/recipe';


export default class {

    constructor( payload ) {
        this.id = payload.id;
        this.currentUserId = payload.userId;

        this.recipe = null;
    }

    execute() {
        return getRecipeFromDatabase.call( this )
            .bind( this )
            .then( setRecipe )
            .then( checkIfMyRecipe )
            .then( deleteRecipeAndOils )
            .then( returnRecipe );
    }
}

////////////////////
///// private

function getRecipeFromDatabase() {
    return Recipe
        .forge( { id: this.id } )
        .fetch( {
            require: true,
            withRelated: [ 'oils' ]
        } );
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function checkIfMyRecipe() {
    if ( Number( this.currentUserId ) !== Number( this.recipe.get( 'user_id' ) ) ) {
        throw new NotAuthorisedError( 'Cannot delete: recipe owner mismatch.' )
    }
}

function deleteRecipeAndOils() {

    function deleteRecipeOils() {
        return this.recipe.oils().detach();
    }

    function deleteRecipe() {
        return this.recipe.destroy();
    }

    return deleteRecipeOils.call( this )
        .then( deleteRecipe.bind( this ) );
}

function returnRecipe() {
    return true;
}