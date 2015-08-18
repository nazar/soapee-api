import { Feedable } from 'models/feedable';

import FeedablesList from 'services/data/feedablesList';
import GetCommentableComments from 'services/data/getCommentableComments';

import AddCommentableComment from 'services/form/addCommentableComment';

import serviceResponder from 'utils/serviceResponder';

export function index( req, res, next ) {
    serviceResponder( res, next, FeedablesList );
}

export function getFeedableComments( req, res, next ) {
    serviceResponder( res, next, GetCommentableComments, {
        commentableId: req.params.id,
        commentableModel: Feedable
    } );
}

export function addFeedableComments( req, res, next ) {
    serviceResponder( res, next, AddCommentableComment, {
        commentableModel: Feedable,
        commentableType: 'feedables',
        commentableId: req.params.id,
        userId: req.session.userId,
        comment: req.body.comment
    } );
}