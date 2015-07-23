import { Router } from 'express';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    myProfile,
    updateMyProfile,
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

router.route('/recipes')
    .get( myRecipes );

router.route('/favourite/recipes')
    .get( myFavouriteRecipes );

router.route('/favourite/recipes/:id')
    .put( addRecipeToFavourites )
    .delete( removeRecipeFromFavourites );


export default router;