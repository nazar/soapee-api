export default function( model, payload, res, next ) {

    function success( newObject ) {
        res.json( newObject );
    }

    model
        .forge( payload )
        .save()
        .then( success )
        .catch( next );
}