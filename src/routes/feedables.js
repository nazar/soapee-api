import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    index,

    getFeedableComments,
    addFeedableComments
} from 'controllers/feedables';

let router = Router();

router.route( '/' )
    .get( index );

router.route( '/:id/comments' )
    .get( getFeedableComments )
    .post( requiresAuthorisation, addFeedableComments );

export default router;