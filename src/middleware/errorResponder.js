export default function ( err, req, res, next ) {

    if ( err.name === 'CheckitError' ) {
        res.status( 422 );
        res.send( {
            message: 'Validation failed',
            errorType: 'validation',
            fields: err.toJSON()
        } );
    } else if ( err.name === 'BadPasswordError' ) {
        res.status( 401 );
        res.send( {
            message: err.message,
            errorType: err.name
        } );
    } else if ( err.name === 'RecordNotFoundError' ) {
        res.status( 404 );
        res.send( {
            message: err.message,
            errorType: err.name
        } );
    } else if ( err.name === 'NotAuthorisedError' ) {
        res.status( 403 );
        res.send( {
            message: err.message,
            errorType: err.name
        } );
    } else {
        res.status( 500 );
        res.send( {
            message: 'Unhandled exception',
            errorType: err.name
        } );

        console.log( 'Error Message: ', err.message );
        console.log( 'Error Stack: ', err.stack );
    }

    next();
}