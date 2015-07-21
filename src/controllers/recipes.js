import _ from 'lodash';

import RecipesList from 'services/data/recipesList';
import RecipeWithRelated from 'services/data/recipeWithRelated';
import RecipeSave from 'services/form/recipeSave';

import promiseResponder from 'utils/promiseResponder';

export function index( req, res, next ) {
    let service;

    service = new RecipesList();

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function getRecipe( req, res, next ) {
    let service;

    service = new RecipeWithRelated( req.params.id );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function post( req, res, next ) {
    let service;

    service = new RecipeSave( {
        recipe: req.body,
        userId: _.get( req.session, 'userId' )
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}