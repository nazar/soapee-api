import { Router } from 'express';
import multer from 'multer';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

let upload = multer( { dest: '/tmp/soapee-uploads' } );

import {
    post
} from 'controllers/imageable';

let router = Router();

router.route( '/' )
    .post( requiresAuthorisation, upload.single( 'file' ), post );


export default router;