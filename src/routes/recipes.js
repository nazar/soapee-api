import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    index,
    getRecipe,
    post,
    put,
    deleteRecipe,

    getRecipeComments,
    addRecipeComments
} from 'controllers/recipes';

let router = Router();

router.route( '/' )
    .get( index )
    .post( requiresAuthorisation, post );

router.route( '/:id' )
    .get( getRecipe )
    .put( requiresAuthorisation, put )
    .delete( requiresAuthorisation, deleteRecipe );

router.route( '/:id/comments' )
    .get( getRecipeComments )
    .post( requiresAuthorisation, addRecipeComments );

export default router;