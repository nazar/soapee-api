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
            .then( notifyTargetUser )
            .then( returnFriendship )
            .catch( checkForDuplicates )
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

function notifyTargetUser() {
    return UserNotification
        .forge( {
            user_id: this.targetUserId,
            type: 1,
            message: `${this.currentUser.get( 'name' )} as requested to be your friend`
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

