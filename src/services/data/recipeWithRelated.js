import _ from 'lodash';

import { Recipe } from 'models/recipe';
import NotAuthorisedError from 'exceptions/notAuthorised';

export default class {

    constructor( recipeId ) {
        this.id = recipeId.id;
        this.currentUserId = Number( recipeId.currentUserId );

        this.oils = null;
        this.weights = null;
    }

    execute() {
        return getRecipe.call( this )
            .bind( this )
            .then( setRecipe )
            .then( checkVisibilityAccess )
            .then( buildWeights )
            .then( returnRecipe );
    }
}

//////////////////
////// Private

function getRecipe() {
    return Recipe
        .forge( { id: this.id } )
        .fetch( {
            withRelated: [ 'oils', 'user' ]
        } );
}

function setRecipe( recipe ) {
    this.recipe = recipe;
}

function checkVisibilityAccess() {
    if ( Number( this.recipe.get('visibility') ) === 0 ) {
        //is it secret?! it is safe?!!
        if ( Number( this.recipe.get('user_id') ) !== this.currentUserId ) {
            throw new NotAuthorisedError( 'Cannot view recipe as it is marked Private' );
        }
    }
}

function buildWeights() {
    this.weights = {};

    this.recipe.related( 'oils' ).each( oil => {
        this.weights[ oil.get( 'id' ) ] = oil.pivot.get( 'weight' );
    } );
}

function returnRecipe() {
    return _.extend( {}, this.recipe.toJSON(), {
        weights: this.weights
    } );
}