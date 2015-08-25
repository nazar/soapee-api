import InvalidPostData from 'exceptions/invalidPostData';

import { User } from 'models/user';
import { Friendship } from 'models/friendship';
import { UserNotification } from 'models/userNotification';

export default class {

    constructor( payload ) {
        this.currentUserId = payload.currentUserId;
        this.targetUserId = payload.targetUserId;

        this.currentUser = null;
        this.friendship = null;
    }

    execute() {
        return getCurrentUser.call( this )
            .bind( this )
            .then( createFriendship )
            .then( setFriendship )
            .then( requestingOrApprovingFriendship )
            .then( notifyTargetUser )
            .then( returnFriendship )
            .catch( checkForDuplicates );
    }
}

////////////////////
///// private

function getCurrentUser() {
    return User
        .forge( {
            id: this.currentUserId
        } )
        .fetch()
        .then( user => this.currentUser = user );
}

function createFriendship() {
    return Friendship
        .forge( {
            user_id: this.currentUserId,
            friend_id: this.targetUserId
        } )
        .save();
}

function setFriendship( friendship ) {
    this.friendship = friendship;
}

function requestingOrApprovingFriendship() {
    return this.currentUser
        .fetch( {
            withRelated: [ 'friends' ]
        } )
        .then( user => this.currentUser = user );
}

function notifyTargetUser() {
    let message;
    let type;

    if ( this.currentUser.related( 'friends' ).size() ) {
        message = `${this.currentUser.get( 'name' )} became your friend!`;
        type = 0;
    } else {
        message = `${this.currentUser.get( 'name' )} wants to be your friend`;
        type = 1;
    }

    return UserNotification
        .forge( {
            user_id: this.targetUserId,
            message,
            type,
            user_notifiable_id: this.friendship.get( 'id' ),
            user_notifiable_type: 'friendships'
        } )
        .save();
}

function checkForDuplicates( e ) {
    if ( e.constraint && (e.constraint === 'friendships_prevent_duplicate_requests') ) {
        throw new InvalidPostData( 'Friend request already exists' );
    }
}

function returnFriendship() {
    return this.friendship;
}

