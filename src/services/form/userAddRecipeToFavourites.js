import { User } from 'models/user';

export default class {

    constructor( payload ) {
        this.id = payload.userId;
        this.recipeId = payload.recipeId;

        this.user = null;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .bind( this )
            .then( setUser )
            .then( attachRecipe )
            .then( returnSuccess );
    }
}

////////////////////
///// private

function getUserFromDatabase() {
    return User
        .forge( { id: this.id } )
        .fetch();
}

function setUser( user ) {
    this.user = user;
}

function attachRecipe() {

    function attach() {
        return this.user
            .favouriteRecipes()
            .attach( {
                recipe_id: this.recipeId,
                created_at: new Date()
            } );
    }

    return this.user
        .favouriteRecipes()
        .detach( this.recipeId )
        .then( attach.bind( this ) );
}

function returnSuccess() {
    return { done: true };
}

