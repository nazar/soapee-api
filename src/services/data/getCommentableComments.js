export default class {

    constructor( options ) {
        this.commentableId = options.commentableId;
        this.commentableModel = options.commentableModel;

        this.commentable = null;
        this.comments = null;
    }

    execute() {
        return getCommentableWithComments.call( this )
            .bind( this )
            .then( setCommentable )
            .then( returnComments );
    }
}

//////////////////
////// Private

function getCommentableWithComments() {
    return this.commentableModel
        .forge( { id: this.commentableId } )
        .fetch( {
            withRelated: [ 'comments.user', {
                comments: qb => {
                    qb
                        .select( [ 'id', 'comment', 'user_id', 'commentable_id', 'created_at' ] )
                        .orderBy( 'created_at', 'desc' );
                }
            } ]
        } );
}

function setCommentable( recipe ) {
    this.commentable = recipe;
}

function returnComments() {
    return this.commentable.related( 'comments' );
}