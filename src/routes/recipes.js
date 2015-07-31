import { Router } from 'express';

import {
    index,
    getRecipe,
    post,
    put,

    saveAsCopy,
    getRecipeComments,
    addRecipeComments
} from 'controllers/recipes';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let router = Router();

router.route( '/' )
    .get( index )
    .post( requiresAuthorisation, post );

router.route( '/:id' )
    .get( getRecipe )
    .put( requiresAuthorisation, put );

router.route( '/:id/save-copy' )
    .put( requiresAuthorisation, saveAsCopy );

router.route( '/:id/comments' )
    .get( getRecipeComments )
    .post( addRecipeComments );

export default router;