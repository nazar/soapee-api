import { Router } from 'express';
import { index, post } from 'controllers/recipes';

let router = new Router();

router.route('/')
    .get( index )
    .post( post );

export default router;