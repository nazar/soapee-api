import {Recipe} from 'models/recipe';

import modelPostResponder from 'utils/modelPostResponder';

export function post( req, res ) {
    modelPostResponder( Recipe, req.body, res );
}