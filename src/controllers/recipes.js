import { Recipe } from 'models/recipe';
import { RecipeJournal } from 'models/recipeJournal';

import RecipesList from 'services/data/recipesList';
import RecipeWithRelated from 'services/data/recipeWithRelated';
import GetCommentableComments from 'services/data/getCommentableComments';
import GetRecipeJournal from 'services/data/getRecipeJournal';
import GetRecipeJournals from 'services/data/getRecipeJournals';

import RecipeSave from 'services/form/recipeSave';
import RecipeDelete from 'services/form/recipeDelete';
import RecipeUpdate from 'services/form/recipeUpdate';
import RecipeJournalForm from 'services/form/recipeJournal';
import RecipeJournalDelete from 'services/form/recipeJournalDelete';
import AddCommentableComment from 'services/form/addCommentableComment';

import serviceResponder from 'utils/serviceResponder';


export function index( req, res, next ) {
    serviceResponder( res, next, RecipesList, {
        page: req.query.page,
        limit: req.query.limit,
        offset: req.query.offset
    } );
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

export function deleteRecipe ( req, res, next ) {
    serviceResponder( res, next, RecipeDelete, {
        id: req.params.id,
        userId: req.session.userId
    } );
}

export function getRecipeJournal ( req, res, next ) {
    serviceResponder( res, next, GetRecipeJournal, {
        recipeId: req.params.id,
        recipeJournalId: req.params.recipeJournalId,
        userId: req.session.userId
    } );
}

export function getRecipeJournalComments ( req, res, next ) {
    serviceResponder( res, next, GetCommentableComments, {
        commentableId: req.params.recipeJournalId,
        commentableModel: RecipeJournal
    } );
}

export function addRecipeJournalComments ( req, res, next ) {
    serviceResponder( res, next, AddCommentableComment, {
        commentableModel: RecipeJournal,
        commentableType: 'recipe_journals',
        commentableId: req.params.recipeJournalId,
        userId: req.session.userId,
        comment: req.body.comment
    } );
}

export function getRecipeJournals ( req, res, next ) {
    serviceResponder( res, next, GetRecipeJournals, {
        recipeId: req.params.id,
        page: req.query.page
    } );
}

export function addRecipeJournal ( req, res, next ) {
    serviceResponder( res, next, RecipeJournalForm, {
        recipeId: req.params.id,
        userId: req.session.userId,
        journal: req.body.journal
    } );
}

export function updateRecipeJournals ( req, res, next ) {
    serviceResponder( res, next, RecipeJournalForm, {
        recipeId: req.params.id,
        recipeJournalId: req.params.recipeJournalId,
        userId: req.session.userId,
        journal: req.body.journal,
        deleting: req.body.deleting
    } );
}

export function deleteRecipeJournal ( req, res, next ) {
    serviceResponder( res, next, RecipeJournalDelete, {
        recipeId: req.params.id,
        recipeJournalId: req.params.recipeJournalId,
        userId: req.session.userId
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