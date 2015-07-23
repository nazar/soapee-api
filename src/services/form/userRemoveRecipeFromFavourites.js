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
            .then( detachRecipe )
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

function detachRecipe() {
    return this.user
        .favouriteRecipes()
        .detach( this.recipeId );
}

function returnSuccess() {
    return { done: true };
}

