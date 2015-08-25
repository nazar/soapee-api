import bookshelf from 'db/bookshelf';

import { Comment } from 'models/comment';
import { Friendship } from 'models/friendship';
import { Recipe } from 'models/recipe';
import { StatusUpdate } from 'models/statusUpdate';
import { UserNotification } from 'models/userNotification';
import { Verification } from 'models/verification';

export let User = bookshelf.Model.extend( {
    tableName: 'users',
    hasTimestamps: true,

    verifications() {
        return this.hasMany( Verification );
    },

    comments() {
        return this.hasMany( Comment );
    },

    recipes() {
        return this.hasMany( Recipe );
    },

    statusUpdates() {
        return this.hasMany( StatusUpdate );
    },

    favouriteRecipes() {
        return this
            .belongsToMany( Recipe, 'favourite_recipes' )
            .query( {
                where: {
                    visibility: 1
                }
            } );
    },

    userNotifications() {
        return this.hasMany( UserNotification );
    },

    /**
     * Symmetric friendship relationships
     */
    friends() {
        return this
            .belongsToMany( User )
            .through( Friendship, 'friend_id', 'user_id' )
            .query( qb => {
                qb.whereRaw( 'exists( select 1 from friendships f where f.friend_id = friendships.user_id and f.user_id = friendships.friend_id )' );
            } );
    },

    /**
     * Other people requesting to be friends with me but I have yet to approve their friend requests
     */
    pendingIncomingFriendRequests() {
        return this
            .belongsToMany( User )
            .through( Friendship, 'friend_id', 'user_id' )
            .query( qb => {
                qb.whereRaw( 'not exists( select 1 from friendships f where f.friend_id = friendships.user_id and f.user_id = friendships.friend_id )' );
            } );
    },

    /**
     * Me requesting to be friends with other people and they have yet to approve the friendship request
     */
    pendingOutgoingFriendRequests() {
        return this
            .belongsToMany( User )
            .through( Friendship, 'user_id', 'friend_id' )
            .query( qb => {
                qb.whereRaw( 'not exists( select 1 from friendships f where f.friend_id = friendships.user_id and f.user_id = friendships.friend_id )' );
            } );
    }

} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );