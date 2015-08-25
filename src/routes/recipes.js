import { Router } from 'express';
import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    index,
    getRecipe,
    post,
    put,
    deleteRecipe,

    getRecipeJournal,
    getRecipeJournals,
    addRecipeJournal,
    updateRecipeJournals,
    deleteRecipeJournal,

    getRecipeJournalComments,
    addRecipeJournalComments,

    getRecipeComments,
    addRecipeComments
} from 'controllers/recipes';

let router = Router();

router.route( '/' )
    .get( index )
    .post( requiresAuthorisation, post );

router.route( '/:id' )
    .get( getRecipe )
    .put( requiresAuthorisation, put )
    .delete( requiresAuthorisation, deleteRecipe );

router.route( '/:id/comments' )
    .get( getRecipeComments )
    .post( requiresAuthorisation, addRecipeComments );

router.route( '/:id/journals' )
    .get( getRecipeJournals )
    .post( requiresAuthorisation, addRecipeJournal );

router.route( '/:id/journals/:recipeJournalId' )
    .get( getRecipeJournal )
    .put( requiresAuthorisation, updateRecipeJournals )
    .delete( requiresAuthorisation, deleteRecipeJournal );

router.route( '/:id/journals/:recipeJournalId/comments' )
    .get( getRecipeJournalComments )
    .post( addRecipeJournalComments );

export default router;