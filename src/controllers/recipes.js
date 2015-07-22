import RecipesList from 'services/data/recipesList';
import RecipeWithRelated from 'services/data/recipeWithRelated';
import RecipeSave from 'services/form/recipeSave';
import RecipeUpdate from 'services/form/recipeUpdate';

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
        userId: req.session.userId
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function put ( req, res, next ) {
    let service;

    service = new RecipeUpdate( {
        id: req.params.id,
        recipe: req.body,
        userId: req.session.userId
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}