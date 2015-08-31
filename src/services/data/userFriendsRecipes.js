import _ from 'lodash';
import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;

        this.recipes = null;
    }

    execute() {
        return getUserFriendsWithRecipes.call( this )
            .bind( this )
            .then( setRecipes )
            .then( returnRecipes );
    }
}

/////////////
////

function getUserFriendsWithRecipes() {

    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            withRelated: [
                {
                    'friends.recipes': qb => {
                        qb.where( 'recipes.visibility', '>', 0 );
                        qb.orderBy( 'recipes.name' );
                    }
                },
                'friends.recipes.user'
            ]
        } );
}

function setRecipes( user ) {
    this.recipes = user
        .related( 'friends' )
        .reduce( ( result, friend) => {
            return _.tap( result, r => {
                friend.related( 'recipes' ).each( recipe => r.push( recipe ) );
            } );
        }, [] );
}

function returnRecipes() {
    return this.recipes;
}