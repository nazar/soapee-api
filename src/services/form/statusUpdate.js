import _ from 'lodash';
import Promise from 'bluebird';
import sanitize from 'utils/sanitize';

import { Feedable } from 'models/feedable';
import { Image } from 'models/image';
import { StatusUpdate } from 'models/statusUpdate';

export default class {

    constructor( option ) {
        this.statusUpdateId = option.statusUpdateId;

        this.payload = {
            user_id: option.userId,
            update: option.update
        };
        this.deleting = option.deleting;

        this.statusUpdate = null;
    }

    execute() {
        return Promise.method( sanitizeInputs ).call( this )
            .bind( this )
            .then( saveStatusUpdate )
            .then( setStatusUpdate )
            .then( createFeedableEntry )
            .then( returnStatusUpdate );
    }
}

////////////////////
///// private

function sanitizeInputs() {
    this.payload.update = sanitize( this.payload.update );
}

function saveStatusUpdate() {
    let update;

    if ( this.statusUpdateId ) {
        update = StatusUpdate
            .forge( {
                id: this.statusUpdateId,
                user_id: this.payload.user_id
            } )
            .fetch( {
                require: true
            } )
            .then( statusUpdate => statusUpdate.save( this.payload, { patch: true } ) );
    } else {
        update = StatusUpdate
            .forge( this.payload )
            .save();
    }

    return update
        .tap( deleteImageablesIfRequired.bind( this ) )
        .then( fetchRelated.bind( this ) );


    function deleteImageablesIfRequired( statusUpdate ) {
        if ( _.get( this.deleting, 'imageables.length' ) ) {
            return Promise.resolve( this.deleting.imageables )
                .each( deleteImageable.bind( this, statusUpdate ) );
        }
    }

    function deleteImageable( statusUpdate, imageableId ) {
        return Image
            .forge( {
                id: imageableId,
                imageable_id: statusUpdate.get( 'id' )
            } )
            .fetch()
            .then( image => image.destroy() );
    }

    function fetchRelated( statusUpdate ) {
        return StatusUpdate
            .where( {
                id: statusUpdate.get( 'id' )
            } )
            .fetch( {
                withRelated: [
                    {
                        user: qb => {
                            qb.select( 'users.id', 'users.name' );
                        }
                    }
                ]
            } );
    }
}

function setStatusUpdate( statusUpdate ) {
    this.statusUpdate = statusUpdate;
}

function createFeedableEntry() {
    //don't create feedable if this is an update
    if ( !(this.statusUpdateId) ) {
        return Feedable
            .forge( {
                feedable_id: this.statusUpdate.get( 'id' ),
                feedable_type: 'status_updates',
                feedable_meta: {
                    user: {
                        id: this.statusUpdate.related( 'user' ).get( 'id' ),
                        name: this.statusUpdate.related( 'user' ).get( 'name' ),
                        image_url: this.statusUpdate.related( 'user' ).get( 'image_url' )
                    },
                    target: {
                        id: this.statusUpdate.get( 'id' ),
                        update: this.statusUpdate.get( 'update' )
                    }
                }
            } )
            .save();
    }
}

function returnStatusUpdate() {
    return this.statusUpdate;
}

