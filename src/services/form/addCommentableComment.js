import sanitize from 'utils/sanitize';

import { Comment } from 'models/comment';
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
            .then( sanitizeInputs )
            .then( addComment )
            .then( setComment )
            .then( createUserNotificationForRecipes )
            .then( returnComment );
    }
}

////////////////////
///// private

function getCommentable() {
    return this.commentableModel
        .forge( { id: this.commentableId } )
        .fetch();
}

function setCommentable( commentable ) {
    this.commentable = commentable;
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

function returnComment() {
    return this.comment;
}

