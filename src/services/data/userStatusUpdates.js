import { User } from 'models/user';

export default class {

    constructor( options ) {
        this.userId = options.userId;
    }

    execute() {
        return getUserStatusUpdates.call( this )
            .then( returnStatusUpdates );
    }
}

/////////////
////

function getUserStatusUpdates() {

    return User
        .forge( {
            id: this.userId
        } )
        .fetch( {
            require: true,
            withRelated: [ {
                statusUpdates: qb => {
                    qb.orderBy( 'updated_at', 'desc' );
                }
            }, 'statusUpdates.images']
        } );
}

function returnStatusUpdates( user ) {
    return user.related( 'statusUpdates' );
}