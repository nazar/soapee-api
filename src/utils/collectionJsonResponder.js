export default function ( collection, res, next ) {
    return collection
        .forge()
        .fetch()
        .then( data => {
            res.json( data.toJSON() );
        } )
        .catch( next );
}