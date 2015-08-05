import InvalidPostData from 'exceptions/invalidPostData';
import { Friendship } from 'models/friendship';

export default class {

    constructor( payload ) {
        this.currentUserId = payload.currentUserId;
        this.targetUserId = payload.targetUserId;
    }

    execute() {
        return createFriendship.call( this )
            .bind( this )
            .then( returnFriendship )
            .catch( checkForDuplicates )
    }
}

////////////////////
///// private

function createFriendship() {
    return Friendship
        .forge( {
            user_id: this.currentUserId,
            friend_id: this.targetUserId
        } )
        .save();
}

function checkForDuplicates( e ) {
    if ( e.constraint && (e.constraint === 'friendships_prevent_duplicate_requests') ) {
        throw new InvalidPostData( 'Friend request already exists' );
    }
}

function returnFriendship( friendship ) {
    return friendship;
}

