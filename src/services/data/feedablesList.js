import { Feedables } from 'models/feedable';

export default class {

    execute() {
        return Feedables
            .query( qb => {
                qb.orderBy( 'id', 'desc' );
            } )
            .fetch();
    }
}

//////////////////
////// Private

