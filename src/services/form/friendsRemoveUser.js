import RecordNotFound from 'exceptions/recordNotFound';
import { Friendship } from 'models/friendship';

export default class {

    constructor( payload ) {
        this.currentUserId = payload.currentUserId;
        this.targetUserId = payload.targetUserId;
    }

    execute() {
        return findFriendship.call( this )
            .bind( this )
            .then( deleteFriendship )
            .then( returnFriendship );
    }
}

////////////////////
///// private

function findFriendship() {
    return Friendship
        .forge( {
            user_id: this.currentUserId,
            friend_id: this.targetUserId
        } )
        .fetch();
}

function deleteFriendship( friendship ) {
    if ( friendship ) {
        return friendship.destroy();
    } else {
        throw new RecordNotFound();
    }
}

function returnFriendship( friendships ) {
    return friendships;
}