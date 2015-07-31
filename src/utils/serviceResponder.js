import promiseResponder from 'utils/promiseResponder';

export default function( res, next, serviceClass, packet ) {
    let service;

    service = new serviceClass( packet );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}