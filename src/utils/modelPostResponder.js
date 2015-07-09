export default function( model, payload, res ) {

    function success( newObject ) {
        res.json( newObject );
    }

    function error( err ) {
        res
            .status( 500 )
            .json( { error: err.toString() } );
    }

    model
        .forge( payload )
        .save()
        .then( success )
        .catch( error );
}