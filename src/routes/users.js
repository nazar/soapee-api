import { Router } from 'express';

import {
    get,
    getUserRecipes,
    getUserFriends
} from 'controllers/users';

let router = Router();

router.route('/:id')
    .get( get );

router.route('/:id/recipes')
    .get( getUserRecipes );

router.route('/:id/friends')
    .get( getUserFriends );

export default router;