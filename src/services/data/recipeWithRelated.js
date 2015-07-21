import _ from 'lodash';

import { Recipe } from 'models/recipe';

export default class {

    constructor( recipeId ) {
        this.id = recipeId;

        this.oils = null;
        this.weights = null;
    }

    execute() {
        return getRecipe.call( this )
            .bind( this )
            .then( setRecipe )
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