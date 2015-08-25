import { StatusUpdate } from 'models/statusUpdate';

export default class {

    constructor( option ) {
        this.statusUpdateId = option.statusUpdateId;

        this.statusUpdate = null;
    }

    execute() {
        return getStatusUpdate.call( this )
            .bind( this )
            .then( returnStatusUpdate );
    }
}

////////////////////
///// private

function getStatusUpdate() {
    return StatusUpdate
        .forge( {
            id: this.statusUpdateId
        } )
        .fetch( {
            require: true,
            withRelated: [
                'images',
                {
                    user: qb => {
                        qb.select( 'id', 'name', 'image_url' );
                    }
                }
            ]
        } );
}

function returnStatusUpdate( statusUpdate ) {
    return statusUpdate;
}

