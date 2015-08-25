import Promise from 'bluebird';
import bookshelf from 'db/bookshelf';

import { Recipe } from 'models/recipe';
import { RecipeJournal } from 'models/recipeJournal';

import NotAuthorisedError from 'exceptions/notAuthorised';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.recipeJournalId = options.recipeJournalId;
        this.recipeId = options.recipeId;

        this.recipeJournal = null;
        this.recipe = null;
        this.transaction = null;
    }

    execute() {
        return getRecipe.call( this )
            .bind( this )
            .then( userUserOwnership )
            .then( getRecipeJournal )
            .then( startTransaction )
            .then( deleteAssociations )
            .then( deleteStatusUpdate )
            .then( commit )
            .then( returnDone );
    }
}

////////////////////
///// private

function getRecipe() {
    return Recipe
        .forge( {
            id: this.recipeId
        } )
        .fetch()
        .then( recipe => this.recipe = recipe );
}

function userUserOwnership() {
    if ( Number( this.recipe.get( 'user_id' ) !== Number( this.userId ) ) ) {
        throw new NotAuthorisedError( 'Recipe owner mismatch: cannot post journals.' );
    }
}

function getRecipeJournal() {
    return RecipeJournal
        .forge( {
            id: this.recipeJournalId,
            recipe_id: this.recipeId
        } )
        .fetch( {
            require: true,
            withRelated: [ 'images', 'comments' ]
        } )
        .then( recipeJournal => this.recipeJournal = recipeJournal );
}

function startTransaction() {
    return new Promise( resolve => {
        bookshelf.transaction( t => resolve( t ) );
    } )
        .then( transaction => this.transaction = transaction );
}

function deleteAssociations() {
    return destroyComments.call( this )
        .then( destroyImages.bind( this ) );


    function destroyComments() {
        return this.recipeJournal
            .related( 'comments' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }

    function destroyImages() {
        return this.recipeJournal
            .related( 'images' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }
}

function deleteStatusUpdate() {
    return this.recipeJournal.destroy( { transacting: this.transaction } );
}

function commit() {
    this.transaction.commit();
}

function returnDone() {
    return true;
}

