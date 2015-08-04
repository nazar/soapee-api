import { Router } from 'express';

import auths from 'routes/auths';
import me from 'routes/me';
import oils from 'routes/oils';
import recipes from 'routes/recipes';
import users from 'routes/users';

let router = new Router();

router.use( '/auths', auths );
router.use( '/me', me );
router.use( '/oils', oils );
router.use( '/recipes', recipes );
router.use( '/users', users );

export default router;