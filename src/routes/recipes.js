import { Router } from 'express';

import { index, post } from 'controllers/recipes';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let router = Router();

router.route('/')
    .get( index )
    .post( requiresAuthorisation, post );

export default router;