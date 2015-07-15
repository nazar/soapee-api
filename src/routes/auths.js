import { Router } from 'express';

import { login, post, currentUser, logout, usernameExists } from 'controllers/auths';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let router = Router();

router.route('/')
    .post( post );

router.route('/login')
    .post( login );

router.route('/logout')
    .post( requiresAuthorisation, logout );

router.route('/current-user' )
    .get( requiresAuthorisation, currentUser );

router.route('/users/:username/exists' )
    .get( usernameExists );

export default router;