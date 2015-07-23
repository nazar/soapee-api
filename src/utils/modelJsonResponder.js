export default function ( model, id, res, next, options ) {
    return model
        .forge( {
            id
        } )
        .fetch( options.fetch )
        .then( data => {
            res.json( data.toJSON() );
        } )
        .catch( next );
}