import { Router } from 'express';

import { index, getRecipe, post, put } from 'controllers/recipes';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let router = Router();

router.route( '/' )
    .get( index )
    .post( requiresAuthorisation, post );

router.route( '/:id' )
    .get( getRecipe )
    .put( requiresAuthorisation, put );

export default router;