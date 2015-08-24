import { Image } from 'models/image';

import ImagesProcessor from 'services/form/imagesProcessor';

import serviceResponder from 'utils/serviceResponder';

export function post( req, res, next ) {
    serviceResponder( res, next, ImagesProcessor, {
        userId: req.session.userId,
        payload: req.body,
        file: req.file
    } );
}
