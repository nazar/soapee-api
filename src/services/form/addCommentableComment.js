import sanitize from 'utils/sanitize';

import { Comment } from 'models/comment';

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

function returnComment() {
    return this.comment;
}

