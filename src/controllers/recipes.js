import _ from 'lodash';

import { Recipe } from 'models/recipe';

import RecipesList from 'services/data/recipesList';

import modelPostResponder from 'utils/modelPostResponder';
import sanitize from 'utils/sanitize';
import promiseResponder from 'utils/promiseResponder';

export function index( req, res, next ) {
    let service;

    service = new RecipesList();

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
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