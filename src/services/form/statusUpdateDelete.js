import Promise from 'bluebird';
import bookshelf from 'db/bookshelf'

import { StatusUpdate } from 'models/statusUpdate';

export default class {

    constructor( options ) {
        this.statusUpdateId = options.statusUpdateId;
        this.userId = options.userId;

        this.statusUpdate = null;
        this.transaction = null;
    }

    execute() {
        return getStatusUpdate.call( this )
            .bind( this )
            .then( setStatusUpdate )
            .then( startTransaction )
            .then( deleteStatusUpdateAssociations )
            .then( deleteStatusUpdate )
            .then( commit )
            .then( returnDone );
    }
}

////////////////////
///// private

function getStatusUpdate() {
    return StatusUpdate
        .forge( {
            id: this.statusUpdateId,
            user_id: this.userId
        } )
        .fetch( {
            require: true,
            withRelated: [ 'images', 'comments' ]
        } );
}

function setStatusUpdate( statusUpdate ) {
    this.statusUpdate = statusUpdate;
}

function startTransaction() {
    return new Promise( resolve => {
        bookshelf.transaction( t => resolve(t) );
    } )
        .then( transaction => this.transaction = transaction );
}

function deleteStatusUpdateAssociations() {
    return destroyComments.call( this )
        .then( destroyImages.bind( this ) );


    function destroyComments() {
        return this.statusUpdate
            .related( 'comments' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }

    function destroyImages() {
        return this.statusUpdate
            .related( 'images' )
            .invokeThen( 'destroy', { transacting: this.transaction } );
    }
}

function deleteStatusUpdate() {
    return this.statusUpdate.destroy( { transacting: this.transaction } )
}

function commit() {
    this.transaction.commit();
}

function returnDone() {
    return true;
}

