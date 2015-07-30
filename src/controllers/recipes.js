import { Recipe } from 'models/recipe';

import RecipesList from 'services/data/recipesList';
import RecipeWithRelated from 'services/data/recipeWithRelated';
import GetCommentableComments from 'services/data/getCommentableComments';

import RecipeSave from 'services/form/recipeSave';
import RecipeUpdate from 'services/form/recipeUpdate';
import AddCommentableComment from 'services/form/addCommentableComment';

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

    service = new RecipeWithRelated( {
        id: req.params.id,
        currentUserId: req.session.userId
    } );

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

export function addRecipeComments( req, res, next ) {
    let service;

    service = new AddCommentableComment( {
        commentableModel: Recipe,
        commentableType: 'recipes',
        commentableId: req.params.id,
        userId: req.session.userId,
        comment: req.body.comment
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function getRecipeComments( req, res, next ) {
    let service;

    service = new GetCommentableComments( {
        commentableId: req.params.id,
        commentableModel: Recipe
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}