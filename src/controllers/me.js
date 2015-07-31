import { User } from 'models/user';

import UserUpdateProfile from 'services/form/userUpdateProfile';
import UserAddRecipeToFavourites from 'services/form/userAddRecipeToFavourites';
import UserRemoveRecipeFromFavourites from 'services/form/userRemoveRecipeFromFavourites';

import UserComments from 'services/data/userComments';

import modelJsonResponder from 'utils/modelJsonResponder';
import serviceResponder from 'utils/serviceResponder';


export function myProfile( req, res, next ) {
    let options = {
        omitId: true,
        fetch: {
            columns: [ 'name', 'image_url', 'about' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function myComments( req, res, next ) {
    serviceResponder( res, next, UserComments, {
        userId: req.session.userId
    } );
}

export function updateMyProfile( req, res, next ) {
    serviceResponder( res, next, UserUpdateProfile, {
        userId: req.session.userId,
        name: req.body.name,
        about: req.body.about
    } );
}

export function myRecipes( req, res, next ) {
    let options = {
        omitId: true,
        get: 'recipes',
        fetch: {
            withRelated: [ 'recipes', 'recipes.oils' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function myFavouriteRecipes( req, res, next ) {
    let options = {
        get: 'favouriteRecipes',
        fetch: {
            withRelated: [ 'favouriteRecipes', 'favouriteRecipes.oils', 'favouriteRecipes.user' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function addRecipeToFavourites( req, res, next ) {
    serviceResponder( res, next, UserAddRecipeToFavourites, {
        recipeId: req.params.id,
        userId: req.session.userId
    } );
}

export function removeRecipeFromFavourites( req, res, next ) {
    serviceResponder( res, next, UserRemoveRecipeFromFavourites, {
        recipeId: req.params.id,
        userId: req.session.userId
    } );
}

