import { Router } from 'express';

import { index, getRecipe, post } from 'controllers/recipes';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let router = Router();

router.route( '/' )
    .get( index )
    .post( requiresAuthorisation, post );

router.route( '/:id' )
    .get( getRecipe );

export default router;