import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    getStatusUpdate,
    getStatusUpdateComments,
    addStatusUpdateComments
} from 'controllers/statusUpdates';

let router = Router();

router.route( '/:id' )
    .get( getStatusUpdate );

router.route( '/:id/comments' )
    .get( getStatusUpdateComments )
    .post( requiresAuthorisation, addStatusUpdateComments );

export default router;