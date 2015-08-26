import bookshelf from 'db/bookshelf';
import Promise from 'bluebird';

import NotAuthorisedError from 'exceptions/notAuthorised';

import { Recipe } from 'models/recipe';


export default class {

    constructor( payload ) {
        this.id = payload.id;
        this.currentUserId = payload.userId;

        this.recipe = null;
        this.transaction = null;
    }

    execute() {
        return getRecipeFromDatabase.call( this )
            .bind( this )
            .then( setRecipe )
            .then( checkIfMyRecipe )
            .then( startTransaction )
            .then( deleteRecipeRelations )
            .then( commit )
            .then( done );
    }
}

////////////////////
///// private

function getRecipeFromDatabase() {
    return Recipe
        .forge( { id: this.id } )
        .fetch( {
            require: true,
            withRelated: [ 'comments', 'images', 'oils', 'recipeJournals.comments', 'recipeJournals.images' ]
        } );
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function checkIfMyRecipe() {
    if ( Number( this.currentUserId ) !== Number( this.recipe.get( 'user_id' ) ) ) {
        throw new NotAuthorisedError( 'Cannot delete: recipe owner mismatch.' );
    }
}

function startTransaction() {
    return new Promise( resolve => {
        bookshelf.transaction( t => resolve( t ) );
    } )
        .then( transaction => this.transaction = transaction );
}

function deleteRecipeRelations() {

    return deleteRecipeOils.call( this )
        .bind( this )
        .then( deleteComments )
        .then( deleteImages )
        .then( deleteJournalComments )
        .then( deleteJournalImages )
        .then( deleteJournals )
        .then( deleteRecipe );

    function deleteRecipeOils() {
        return this.recipe.oils().detach(null,  { transacting: this.transaction } );
    }

    function deleteComments() {
        return this.recipe
            .related( 'comments' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }

    function deleteImages() {
        return this.recipe
            .related( 'images' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }

    function deleteJournalImages() {
        return this.recipe
            .related( 'recipeJournals' )
            .each( journal => journal.related( 'comments' ).invokeThen( 'destroy', { transacting: this.transaction } ) );
    }

    function deleteJournalComments() {
        return this.recipe
            .related( 'recipeJournals' )
            .each( journal => journal.related( 'images' ).invokeThen( 'destroy', { transacting: this.transaction } ) );
    }

    function deleteJournals() {
        return this.recipe
            .related( 'recipeJournals' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }

    function deleteRecipe() {
        return this.recipe.destroy( { transacting: this.transaction } );
    }

}

function commit() {
    this.transaction.commit();
}

function done() {
    return true;
}