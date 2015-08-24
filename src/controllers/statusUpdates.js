import { StatusUpdate } from 'models/statusUpdate';

import GetStatusUpdate from 'services/data/statusUpdate';
import GetCommentableComments from 'services/data/getCommentableComments';

import AddCommentableComment from 'services/form/addCommentableComment';
import StatusUpdateForm from 'services/form/statusUpdate';
import StatusUpdateDelete from 'services/form/statusUpdateDelete';

import serviceResponder from 'utils/serviceResponder';

export function getStatusUpdate( req, res, next ) {
    serviceResponder( res, next, GetStatusUpdate, {
        statusUpdateId: req.params.id
    } );
}

export function  addStatusUpdate( req, res, next ) {
    serviceResponder( res, next, StatusUpdateForm, {
        userId: req.session.userId,
        update: req.body.update
    } );
}

export function updateStatusUpdate( req, res, next ) {
    serviceResponder( res, next, StatusUpdateForm, {
        statusUpdateId: req.params.id,
        userId: req.session.userId,
        update: req.body.update,
        deleting: req.body.deleting
    } );
}

export function deleteStatusUpdate( req, res, next ) {
    serviceResponder( res, next, StatusUpdateDelete, {
        statusUpdateId: req.params.id,
        userId: req.session.userId
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