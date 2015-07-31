import { Recipe } from 'models/recipe';

import RecipesList from 'services/data/recipesList';
import RecipeWithRelated from 'services/data/recipeWithRelated';
import GetCommentableComments from 'services/data/getCommentableComments';

import RecipeSave from 'services/form/recipeSave';
import RecipeUpdate from 'services/form/recipeUpdate';
import AddCommentableComment from 'services/form/addCommentableComment';

import serviceResponder from 'utils/serviceResponder';


export function index( req, res, next ) {
    serviceResponder( res, next, RecipesList );
}

export function getRecipe( req, res, next ) {
    serviceResponder( res, next, RecipeWithRelated, {
        id: req.params.id,
        currentUserId: req.session.userId
    } );
}

export function post( req, res, next ) {
    serviceResponder( res, next, RecipeSave, {
        recipe: req.body,
        userId: req.session.userId
    } );
}

export function put ( req, res, next ) {
    serviceResponder( res, next, RecipeUpdate, {
        id: req.params.id,
        recipe: req.body,
        userId: req.session.userId
    } );
}

export function saveAsCopy( req, res, next ) {
    serviceResponder( res, next, RecipeUpdate, {
        id: req.params.id,
        recipe: req.body,
        userId: req.session.userId,
        saveAsCopy: true
    } );
}

export function addRecipeComments( req, res, next ) {
    serviceResponder( res, next, AddCommentableComment, {
        commentableModel: Recipe,
        commentableType: 'recipes',
        commentableId: req.params.id,
        userId: req.session.userId,
        comment: req.body.comment
    } );
}

export function getRecipeComments( req, res, next ) {
    serviceResponder( res, next, GetCommentableComments, {
        commentableId: req.params.id,
        commentableModel: Recipe
    } );
}