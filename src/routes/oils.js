import { Router } from 'express';

import { index } from 'controllers/oils';

let router = Router();

router.route('/')
    .get( index );

export default router;