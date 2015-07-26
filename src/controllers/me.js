import { User } from 'models/user';

import UserUpdateProfile from 'services/form/userUpdateProfile';
import UserAddRecipeToFavourites from 'services/form/userAddRecipeToFavourites';
import UserRemoveRecipeFromFavourites from 'services/form/userRemoveRecipeFromFavourites';

import modelJsonResponder from 'utils/modelJsonResponder';
import promiseResponder from 'utils/promiseResponder';

export function myProfile( req, res, next ) {
    let options = {
        omitId: true,
        fetch: {
            columns: [ 'name', 'image_url', 'about' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function updateMyProfile( req, res, next ) {
    let service;

    service = new UserUpdateProfile( {
        userId: req.session.userId,
        name: req.body.name,
        about: req.body.about
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
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
    let service;

    service = new UserAddRecipeToFavourites( {
        recipeId: req.params.id,
        userId: req.session.userId
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

export function removeRecipeFromFavourites( req, res, next ) {
    let service;

    service = new UserRemoveRecipeFromFavourites( {
        recipeId: req.params.id,
        userId: req.session.userId
    } );

    service.execute()
        .then( promiseResponder( res ) )
        .catch( next );
}

