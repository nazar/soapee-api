import { Router } from 'express';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    myProfile,
    updateMyProfile,
    myComments,
    myRecipes,
    myFavouriteRecipes,
    addRecipeToFavourites,
    removeRecipeFromFavourites
} from 'controllers/me';

let router = Router();

//all requests must be authorised
router.use( requiresAuthorisation );

router.route('/')
    .get( myProfile )
    .post( updateMyProfile );

router.route('/comments')
    .get( myComments );

router.route('/favourite/recipes')
    .get( myFavouriteRecipes );

router.route('/favourite/recipes/:id')
    .put( addRecipeToFavourites )
    .delete( removeRecipeFromFavourites );

router.route('/recipes')
    .get( myRecipes );


export default router;