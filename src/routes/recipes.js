import { Router } from 'express';

import { index, post } from 'controllers/recipes';

let router = Router();

router.route('/')
    .get( index )
    .post( post );

export default router;