import { Recipe } from 'models/recipe';
import { RecipeJournal } from 'models/recipeJournal';

import NotAuthorisedError from 'exceptions/notAuthorised';

export default class {

    constructor( options = {} ) {
        this.recipeId = options.recipeId;
        this.recipeJournalId = options.recipeJournalId;
        this.userId = options.userId;

        this.recipe = null;
        this.recipeJournal = null;
    }

    execute() {
        return getRecipe.call( this )
            .bind( this )
            .then( checkVisibilityAndOwnership )
            .then( getJournal );
    }
}

//////////////////
////// Private

function getRecipe() {
    return Recipe
        .forge( {
            id: this.recipeId
        } )
        .fetch( {
            require: true
        } )
        .then( recipe => this.recipe = recipe );
}

function checkVisibilityAndOwnership() {
    if ( Number( this.recipe.get( 'visibility' ) ) === 0 ) {
        //is it secret?! it is safe?!!
        if ( Number( this.recipe.get( 'user_id' ) ) !== this.userId ) {
            throw new NotAuthorisedError( 'Cannot view recipe as it is marked Private' );
        }
    } else if ( Number( this.recipe.get( 'visibility' ) ) == 2 ) {
        if ( Number( this.recipe.get( 'user_id' ) ) !== this.userId ) {
            return checkIfFriendshipExists.call( this );
        }
    }

    function checkIfFriendshipExists() {
        if ( this.userId ) {
            //only friends can see this recipe
            return this.recipe
                .related( 'user' )
                .fetch( {
                    withRelated: [
                        {
                            friends: qb => {
                                qb.where( { user_id: this.userId } );
                            }
                        }
                    ]
                } )
                .then( recipe => {
                    let friends = recipe.related('friends').size();

                    if ( !(friends > 0) ) {
                        throw new NotAuthorisedError( 'Cannot view recipe as it is marked Private' );
                    }
                } );
        } else {
            throw new NotAuthorisedError( 'Cannot view recipe as it is marked Private' );
        }
    }
}


function getJournal() {
    return RecipeJournal
        .forge( {
            id: this.recipeJournalId,
            recipe_id: this.recipeId
        } )
        .fetch( {
            require: true,
            withRelated: [ 'images' ]
        } );
}
