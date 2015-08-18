import { Router } from 'express';

import auths from 'routes/auths';
import feedables from 'routes/feedables';
import me from 'routes/me';
import oils from 'routes/oils';
import recipes from 'routes/recipes';
import users from 'routes/users';

let router = new Router();

router.use( '/auths', auths );
router.use( '/feedables', feedables );
router.use( '/me', me );
router.use( '/oils', oils );
router.use( '/recipes', recipes );
router.use( '/users', users );

export default router;