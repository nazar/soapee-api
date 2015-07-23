import { Router } from 'express';

import { index, get } from 'controllers/oils';

let router = Router();

router.route('/')
    .get( index );

router.route('/:id')
    .get( get );

export default router;