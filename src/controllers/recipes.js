import _ from 'lodash';

import {Recipe} from 'models/recipe';
import modelPostResponder from 'utils/modelPostResponder';
import sanitize from 'utils/sanitize';

export function post( req, res ) {
    let notes;
    let packet;

    notes = sanitize( req.body.notes );

    packet = _.extend( {}, req.body, {
        notes
    } );

    modelPostResponder( Recipe, packet, res );
}