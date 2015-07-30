import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    index,
    get,
    getOilComments,
    addCommentToOil
} from 'controllers/oils';

let router = Router();

router.route('/')
    .get( index );

router.route('/:id')
    .get( get );

router.route('/:id/comments')
    .get( getOilComments )
    .post( requiresAuthorisation, addCommentToOil );

export default router;