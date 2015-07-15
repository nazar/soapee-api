import { Router } from 'express';

import { login, post, currentUser, logout, usernameExists } from 'controllers/auths';

let router = Router();

router.route('/')
    .post( post );

router.route('/login')
    .post( login );

router.route('/logout')
    .post( logout );

router.route('/current-user' )
    .get( currentUser );

router.route('/users/:username/exists' )
    .get( usernameExists );

export default router;