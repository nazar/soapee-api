import { Oil, Oils } from 'models/oil';

import collectionJsonResponder from 'utils/collectionJsonResponder';
import modelJsonResponder from 'utils/modelJsonResponder';

export function index( req, res, next ) {
    collectionJsonResponder( Oils, res, next );
}

export function get( req, res, next ) {
    let options = {
        fetch: {
            withRelated: 'recipes'
        }
    };

    modelJsonResponder( Oil, req.params.id, res, next, options );
}