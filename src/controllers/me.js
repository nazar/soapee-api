import { User } from 'models/user';

import UserProfile from 'services/data/userProfile';

import FriendsAddUser from 'services/form/friendsAddUser';
import FriendsRemoveUser from 'services/form/friendsRemoveUser';
import UserAddRecipeToFavourites from 'services/form/userAddRecipeToFavourites';
import UserNotificationsUpdate from 'services/form/userNotificationsUpdate';
import UserNotificationsDelete from 'services/form/userNotificationsDelete';
import UserRemoveRecipeFromFavourites from 'services/form/userRemoveRecipeFromFavourites';
import UserUpdateProfile from 'services/form/userUpdateProfile';

import UserComments from 'services/data/userComments';
import UserFriendsRecipes from 'services/data/userFriendsRecipes';
import UserNotifications from 'services/data/userNotifications';
import UserStatusUpdates from 'services/data/userStatusUpdates';

import modelJsonResponder from 'utils/modelJsonResponder';
import serviceResponder from 'utils/serviceResponder';


export function myProfile( req, res, next ) {
    serviceResponder( res, next, UserProfile, {
        userId: req.session.userId
    } );
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
        email: req.body.email,
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

export function myNotifications( req, res, next ) {
    serviceResponder( res, next, UserNotifications, {
        userId: req.session.userId,
        filters: req.query.filters
    } );
}

export function  updateMyNotification( req, res, next ) {
    serviceResponder( res, next, UserNotificationsUpdate, {
        userId: req.session.userId,
        notificationId: req.params.id,
        payload: req.body
    } );
}

export function  deleteMyNotification( req, res, next ) {
    serviceResponder( res, next, UserNotificationsDelete, {
        userId: req.session.userId,
        notificationId: req.params.id
    } );
}

export function  myFriends( req, res, next ) {
    let options = {
        get: 'friends',
        fetch: {
            withRelated: [ 'friends' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function  myFriendPendingIncoming( req, res, next ) {
    let options = {
        get: 'pendingIncomingFriendRequests',
        fetch: {
            withRelated: [ 'pendingIncomingFriendRequests' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function  myFriendsPendingOutgoing( req, res, next ) {
    let options = {
        get: 'pendingOutgoingFriendRequests',
        fetch: {
            withRelated: [ 'pendingOutgoingFriendRequests' ]
        }
    };

    modelJsonResponder( User, req.session.userId, res, next, options );
}

export function  myFriendsRecipes( req, res, next ) {
    serviceResponder( res, next, UserFriendsRecipes, {
        userId: req.session.userId
    } );
}

export function  addFriend( req, res, next ) {
    serviceResponder( res, next, FriendsAddUser, {
        currentUserId: req.session.userId,
        targetUserId: req.params.userId
    } );
}

export function  removeFriend( req, res, next ) {
    serviceResponder( res, next, FriendsRemoveUser, {
        currentUserId: req.session.userId,
        targetUserId: req.params.userId
    } );
}

export function  myStatusUpdates( req, res, next ) {
    serviceResponder( res, next, UserStatusUpdates, {
        userId: req.session.userId
    } );
}