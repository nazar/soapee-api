import _ from 'lodash';

export default function ( err, req, res, next ) {

    if ( err.name === 'CheckitError' ) {
        res.status( 422 );
        res.send( {
            message: 'Validation failed',
            errorType: 'validation',
            fields: err.toJSON()
        } );
    } else if ( _.includes( [
            'InvalidPostData',
            'BadPasswordError',
            'RecordNotFoundError',
            'NotAuthorisedError'
        ], err.name ) ) {

        res.status( err.status );
        res.send( {
            message: err.message,
            errorType: err.name
        } );
    } else if ( err.name === 'CustomError' && err.message === 'EmptyResponse' ) {
        res.status( 404 );
        res.send( {
            message: 'Record not found',
            errorType: 'RecordNotFound'
        } );
    } else {
        res.status( 500 );
        res.send( {
            message: 'Unhandled exception',
            errorType: err.name
        } );

        console.log( 'Error Name: ', err.name );
        console.log( 'Error Message: ', err.message );
        console.log( 'Error Stack: ', err.stack );
    }

    next();
}