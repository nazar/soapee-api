import { Router } from 'express';

import auths from 'routes/auths';
import oils from 'routes/oils';
import recipes from 'routes/recipes';

let router = new Router();

router.use( '/auths', auths );
router.use( '/oils', oils );
router.use( '/recipes', recipes );

export default router;