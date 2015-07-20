import _ from 'lodash';

import { Recipe, Recipes } from 'models/recipe';

import modelPostResponder from 'utils/modelPostResponder';
import sanitize from 'utils/sanitize';
import collectionJsonResponder from 'utils/collectionJsonResponder';

export function index( req, res, next ) {
    collectionJsonResponder( Recipes, res, next );
}

export function post( req, res, next ) {
    let notes;
    let packet;

    notes = sanitize( req.body.notes );

    packet = _.extend( {}, req.body, {
        user_id: _.get( req.session, 'userId' ),
        notes
    } );

    //todo validate packet before calling responder
    modelPostResponder( Recipe, packet, res, next );
}