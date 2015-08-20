import { StatusUpdate } from 'models/statusUpdate';

import GetStatusUpdate from 'services/data/statusUpdate';
import GetCommentableComments from 'services/data/getCommentableComments';

import AddCommentableComment from 'services/form/addCommentableComment';

import serviceResponder from 'utils/serviceResponder';

export function getStatusUpdate( req, res, next ) {
    serviceResponder( res, next, GetStatusUpdate, {
        statusUpdateId: req.params.id
    } );
}

export function getStatusUpdateComments( req, res, next ) {
    serviceResponder( res, next, GetCommentableComments, {
        commentableId: req.params.id,
        commentableModel: StatusUpdate
    } );
}

export function addStatusUpdateComments( req, res, next ) {
    serviceResponder( res, next, AddCommentableComment, {
        commentableModel: StatusUpdate,
        commentableType: 'status_updates',
        commentableId: req.params.id,
        userId: req.session.userId,
        comment: req.body.comment
    } );
}