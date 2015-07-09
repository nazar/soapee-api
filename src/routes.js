import { Router } from 'express';

import oils from 'routes/oils';
import recipes from 'routes/recipes';

let router = new Router();

router.use( '/oils', oils );
router.use( '/recipes', recipes );

export default router;