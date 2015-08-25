import { Feedable, Feedables } from 'models/feedable';

export default class {

    constructor( options = {} ) {
        this.limit = options.limit || 15;
        this.offset = options.offset || this.limit * options.page;

        this.count = null;
        this.feed = null;
    }

    execute() {
        return getFeedCount.call( this )
            .bind( this )
            .then( setCount )
            .then( getFeed )
            .then( returnFeed );
    }
}

//////////////////
////// Private

function getFeedCount() {
    return Feedable
        .query( qb => {
            qb.count( 'id' );
        } )
        .fetch();
}

function setCount( count ) {
    this.count = count;
}

function getFeed() {
    return Feedables
        .query( qb => {
            qb
                .orderBy( 'id', 'desc' )
                .offset( this.offset )
                .limit( this.limit );
        } )
        .fetch( {
            withRelated: 'feedable.images'
        } );
}

function returnFeed( feed ) {
    return {
        count: this.count.get( 'count' ),
        feed
    };
}
