import _ from 'lodash';
import Promise from 'bluebird';
import sanitize from 'utils/sanitize';

import NotAuthorisedError from 'exceptions/notAuthorised';

import { Recipe } from 'models/recipe';
import { RecipeJournal } from 'models/recipeJournal';
import { Feedable } from 'models/feedable';
import { Image } from 'models/image';

export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.recipeId = options.recipeId;
        this.recipeJournalId = options.recipeJournalId;

        this.payload = {
            recipe_id: options.recipeId,
            journal: options.journal
        };
        this.deleting = options.deleting;

        this.recipe = null;
        this.recipeJournal = null;
    }

    execute() {
        return Promise.method( sanitizeInputs ).call( this )
            .bind( this )
            .then( getRecipe )
            .then( checkUserOwnsRecipe )
            .then( saveRecipeJournal )
            .then( setRecipeJournal )
            .then( createFeedableEntry )
            .then( returnStatusUpdate );
    }
}

////////////////////
///// private

function sanitizeInputs() {
    this.payload.journal = sanitize( this.payload.journal );
}

function getRecipe() {
    return Recipe
        .forge( {
            id: this.recipeId
        } )
        .fetch( {
            require: true,
            withRelated: 'user'
        } )
        .then( recipe => this.recipe = recipe );
}

function checkUserOwnsRecipe() {
    if ( Number( this.recipe.get( 'user_id' ) !== Number( this.userId ) ) ) {
        throw new NotAuthorisedError( 'Recipe owner mismatch: cannot post journals.' );
    }
}

function saveRecipeJournal() {
    let recipeJournal;

    if ( this.recipeJournalId ) {
        recipeJournal = RecipeJournal
            .forge( {
                id: this.recipeJournalId,
                recipe_id: this.recipeId
            } )
            .fetch( {
                require: true
            } )
            .then( recipeJournal => recipeJournal.save( this.payload, { patch: true } ) );
    } else {
        recipeJournal = RecipeJournal
            .forge( this.payload )
            .save();
    }

    return recipeJournal
        .tap( deleteImageablesIfRequired.bind( this ) )
        .then( fetchRelated );


    function deleteImageablesIfRequired( recipeJournal ) {
        if ( _.get( this.deleting, 'imageables.length' ) ) {
            return Promise.resolve( this.deleting.imageables )
                .each( deleteImageable.bind( this, recipeJournal ) );
        }
    }

    function deleteImageable( recipeJournal, imageableId ) {
        return Image
            .forge( {
                id: imageableId,
                imageable_id: recipeJournal.get( 'id' )
            } )
            .fetch()
            .then( image => image.destroy() );
    }

    function fetchRelated( journal ) {
        return RecipeJournal
            .where( {
                id: journal.id
            } )
            .fetch( {
                withRelated: 'images'
            } );
    }
}

function setRecipeJournal( recipeJournal ) {
    this.recipeJournal = recipeJournal;
}

function createFeedableEntry() {
    //don't create feedable if this is an update nor if this is a private recipe
    if ( !(this.recipeJournalId) && ( Number( this.recipe.get( 'visibility' ) ) === 1 ) ) {
        return Feedable
            .forge( {
                feedable_id: this.recipeJournal.get( 'id' ),
                feedable_type: 'recipe_journals',
                feedable_meta: {
                    user: {
                        id: this.recipe.related( 'user' ).get( 'id' ),
                        name: this.recipe.related( 'user' ).get( 'name' ),
                        image_url: this.recipe.related( 'user' ).get( 'image_url' )
                    },
                    target: {
                        id: this.recipe.get( 'id' ),
                        name: this.recipe.get( 'name' ),
                        journal: this.recipeJournal.get( 'journal' )
                    }
                }
            } )
            .save();
    }
}

function returnStatusUpdate() {
    return this.recipeJournal;
}

