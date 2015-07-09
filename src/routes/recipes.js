import { Router } from 'express';
import { post } from 'controllers/recipes';

let router = new Router();

router.route('/')
    .post( post );

export default router;