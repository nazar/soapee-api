import { Router } from 'express';

import {
    get,
    getUserRecipes
} from 'controllers/users';

let router = Router();

router.route('/:id')
    .get( get );

router.route('/:id/recipes')
    .get( getUserRecipes );

export default router;