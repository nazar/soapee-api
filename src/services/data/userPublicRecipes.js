import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;

        this.user = null;
    }

    execute() {
        return getUser.call( this )
            .bind( this )
            .then( setUser )
            .then( returnRecipes );
    }
}

//////////////////
////// Private

function getUser() {
    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [ {
                recipes: qb => {
                    qb
                        .where( {
                            visibility: 1
                        } )
                        .orderBy( 'name', 'asc' );
                }
            } ]
        } );
}

function setUser( user ) {
    this.user = user;
}

function returnRecipes() {
    return this.user.related( 'recipes' );
}