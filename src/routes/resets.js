import { Router } from 'express';

import {
    requestReset,
    verifyResetCode,
    resetPassword
} from 'controllers/resets';

let router = Router();

router.route('/request-reset')
    .post( requestReset );

router.route('/verify')
    .post( verifyResetCode );

router.route('/reset-password')
    .post( resetPassword );

export default router;