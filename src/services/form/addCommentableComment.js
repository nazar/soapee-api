import _ from 'lodash';
import sanitize from 'utils/sanitize';

import InvalidPostData from 'exceptions/invalidPostData';

import { Comment } from 'models/comment';
import { Feedable } from 'models/feedable';
import { UserNotification } from 'models/userNotification';

export default class {

    constructor( payload ) {
        this.commentableModel = payload.commentableModel;
        this.commentableType = payload.commentableType;
        this.commentableId = payload.commentableId;
        this.userId = payload.userId;
        this.comment = payload.comment;

        this.commentable = null;
    }

    execute() {
        return getCommentable.call( this )
            .bind( this )
            .then( setCommentable )
            .then( checkAgainstCommentsOnComments ) //turtles all the way down
            .then( sanitizeInputs )
            .then( addComment )
            .then( setComment )
            .then( createFeedableEntryIfPublic )
            .then( createUserNotificationForRecipes )
            .then( createUserNotificationForStatusUpdate )
            .then( returnComment );
    }
}

////////////////////
///// private

function getCommentable() {
    return this.commentableModel
        .forge( { id: this.commentableId } )
        .fetch( {
            require: true
        } );
}

function setCommentable( commentable ) {
    this.commentable = commentable;
}

function checkAgainstCommentsOnComments() {
    if ( (this.commentableType === 'feedables' ) && (this.commentable.get( 'feedable_type' ) === 'comments') ) {
        throw new InvalidPostData( 'Cannot comment on a comment!' );
    }
}

function sanitizeInputs() {
    this.comment = sanitize( this.comment );
}

function addComment() {
    return Comment
        .forge( {
            comment: this.comment,
            user_id: this.userId,
            commentable_id: this.commentable.get( 'id' ),
            commentable_type: this.commentableType
        } )
        .save()
        .then( comment => comment.fetch( { withRelated: [ 'user' ] } ) );
}

function setComment( comment ) {
    this.comment = comment;
}

function createFeedableEntryIfPublic() {

    if ( this.commentableType === 'recipes' ) {
        if ( Number( this.commentable.get( 'visibility' ) ) === 1 ) {
            return createCommentFeedable.call( this );
        }
    } else if ( _.contains( [ 'oils', 'status_updates' ], this.commentableType ) ) {
        return createCommentFeedable.call( this );
    }

    function createCommentFeedable() {
        let targetTypes = {
            recipes: 'recipe',
            oils: 'oil',
            status_updates: 'status-update'
        };

        return Feedable
            .forge( {
                feedable_id: this.comment.get( 'id' ),
                feedable_type: 'comments',
                feedable_meta: {
                    user: {
                        id: this.userId,
                        name: this.comment.related( 'user' ).get( 'name' ),
                        image_url: this.comment.related( 'user' ).get( 'image_url' )
                    },
                    target: {
                        id: this.commentable.get( 'id' ),
                        name: name.call( this ),
                        comment: this.comment.get( 'comment' ),
                        targetType: targetTypes[ this.commentableType ]
                    }
                }
            } )
            .save();
    }

    function name() {
        if ( this.commentableType === 'status_updates' ) {
            return 'status update';
        } else {
            return this.commentable.get( 'name' )
        }
    }

}

function createUserNotificationForRecipes() {
    if ( this.commentableType === 'recipes' ) {
        //no notification if user comments on her own recipes
        if ( Number( this.userId ) !== Number( this.commentable.get( 'user_id' ) ) ) {
            return UserNotification
                .forge( {
                    user_id: this.commentable.get( 'user_id' ),
                    message: JSON.stringify( {
                        commentable: 'recipes',
                        recipe: {
                            id: this.commentable.get( 'id' ),
                            name: this.commentable.get( 'name' )
                        }
                    } ),
                    type: 0,
                    user_notifiable_id: this.comment.get( 'id' ),
                    user_notifiable_type: 'comments'
                } )
                .save();
        }
    }
}

function createUserNotificationForStatusUpdate() {
    if ( this.commentableType === 'status_updates' ) {
        //no notification if user comments on her own status updates
        if ( Number( this.userId ) !== Number( this.commentable.get( 'user_id' ) ) ) {
            return UserNotification
                .forge( {
                    user_id: this.commentable.get( 'user_id' ),
                    message: JSON.stringify( {
                        commentable: 'status_updates',
                        statusUpdate: {
                            id: this.commentable.get( 'id' )
                        }
                    } ),
                    type: 0,
                    user_notifiable_id: this.comment.get( 'id' ),
                    user_notifiable_type: 'comments'
                } )
                .save();
        }
    }
}

function returnComment() {
    return this.comment;
}

