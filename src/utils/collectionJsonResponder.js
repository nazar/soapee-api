export default function ( collection, res ) {
    return collection
        .forge()
        .fetch()
        .then( data => {
            res.json( data.toJSON() );
        } )
        .catch( err => {
            res
                .status( 500 )
                .json( { error: { message: err.message } } );
        } );
}