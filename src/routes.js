import { Router } from 'express';

import auths from 'routes/auths';
import me from 'routes/me';
import oils from 'routes/oils';
import recipes from 'routes/recipes';

let router = new Router();

router.use( '/auths', auths );
router.use( '/me', me );
router.use( '/oils', oils );
router.use( '/recipes', recipes );

export default router;