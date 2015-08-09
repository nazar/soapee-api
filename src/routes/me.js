import { Router } from 'express';

import requiresAuthorisation from 'middleware/requiresAuthorisation';

import {
    myProfile,
    updateMyProfile,

    myComments,

    myRecipes,
    myFavouriteRecipes,
    addRecipeToFavourites,
    removeRecipeFromFavourites,

    myNotifications,
    updateMyNotification,
    deleteMyNotification,

    myFriends,
    myFriendPendingIncoming,
    myFriendsPendingOutgoing,
    myFriendsRecipes,
    addFriend,
    removeFriend
} from 'controllers/me';

let router = Router();

//all requests must be authorised
router.use( requiresAuthorisation );

router.route('/')
    .get( myProfile )
    .post( updateMyProfile );

router.route('/comments')
    .get( myComments );

router.route('/favourite/recipes')
    .get( myFavouriteRecipes );

router.route('/favourite/recipes/:id')
    .put( addRecipeToFavourites )
    .delete( removeRecipeFromFavourites );

router.route('/friends')
    .get( myFriends );

router.route('/friends/:userId')
    .post( addFriend )
    .delete( removeFriend );

router.route('/friends/incoming')
    .get( myFriendPendingIncoming );

router.route('/friends/outgoing')
    .get( myFriendsPendingOutgoing );

router.route('/friends/recipes')
    .get( myFriendsRecipes );


router.route('/notifications')
    .get( myNotifications );

router.route('/notifications/:id')
    .put( updateMyNotification )
    .delete( deleteMyNotification );

router.route('/recipes')
    .get( myRecipes );


export default router;