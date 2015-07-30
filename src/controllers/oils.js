import { Oil, Oils } from 'models/oil';

import AddCommentableComment from 'services/form/addCommentableComment';
import GetCommentableComments from 'services/data/getCommentableComments';

import collectionJsonResponder from 'utils/collectionJsonResponder';
import modelJsonResponder from 'utils/modelJsonResponder';
import promiseResponder from 'utils/promiseResponder';

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

export function getOilComments( req, res, next ) {
    let service;

    service = new GetCommentableComments( {
        commentableId: req.params.id,
        commentableModel: Oil
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function addCommentToOil( req, res, next ) {
    let service;

    service = new AddCommentableComment( {
        commentableModel: Oil,
        commentableType: 'oils',
        commentableId: req.params.id,
        userId: req.session.userId,
        comment: req.body.comment
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}
