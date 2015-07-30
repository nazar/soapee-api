import { Router } from 'express';

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
    .post( addCommentToOil );

export default router;