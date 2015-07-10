import { Router } from 'express';
import { login, post, verify } from 'controllers/auths';

let router = new Router();

router.route('/')
    .post( post );

router.route('/login')
    .post( login );

router.route('/verify')
    .post( verify );

export default router;