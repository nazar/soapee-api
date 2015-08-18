import { Router } from 'express';

import {
    get,
    getUserRecipes,
    getUserFriends,
    getUserStatusUpdates
} from 'controllers/users';

let router = Router();

router.route('/:id')
    .get( get );

router.route('/:id/recipes')
    .get( getUserRecipes );

router.route('/:id/friends')
    .get( getUserFriends );

router.route('/:id/status-updates')
    .get( getUserStatusUpdates );

export default router;