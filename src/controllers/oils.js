import { Oils } from 'models/oil';

import collectionJsonResponder from 'utils/collectionJsonResponder';

export function index( req, res, next ) {
    collectionJsonResponder( Oils, res, next );
}