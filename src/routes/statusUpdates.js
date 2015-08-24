import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    getStatusUpdate,
    addStatusUpdate,
    updateStatusUpdate,
    deleteStatusUpdate,

    getStatusUpdateComments,
    addStatusUpdateComments
} from 'controllers/statusUpdates';

let router = Router();

router.route( '/' )
    .post( requiresAuthorisation, addStatusUpdate );

router.route( '/:id' )
    .get( getStatusUpdate )
    .put( requiresAuthorisation, updateStatusUpdate )
    .delete( requiresAuthorisation, deleteStatusUpdate );

router.route( '/:id/comments' )
    .get( getStatusUpdateComments )
    .post( requiresAuthorisation, addStatusUpdateComments );

export default router;