import { Recipe, Recipes } from 'models/recipe';

export default class {

    constructor( options = {} ) {
        this.limit = options.limit || 10;
        this.offset = options.offset || this.limit * options.page;
    }

    execute() {
        return getRecipesCount.call( this )
            .bind( this )
            .then( setCount )
            .then( getRecipes )
            .then( setRecipes )
            .then( returnRecipes );
    }
}

//////////////////
////// Private

function getRecipesCount() {
    return Recipe
        .query( qb => {
            qb
                .count( 'id' )
                .where( { visibility: 1 } );
        } )
        .fetch();
}

function setCount( count ) {
    this.count = count;
}

function getRecipes() {
    return Recipes
        .query( qb => {
            qb
                .where( { visibility: 1 } )
                .orderBy( 'created_at', 'desc' )
                .offset( this.offset )
                .limit( this.limit );
        } )
        .fetch( {
            withRelated: [ 'user', 'oils' ]
        } );
}

function setRecipes( recipes ) {
    this.recipes = recipes;
}

function returnRecipes() {
    return {
        count: this.count.get( 'count' ),
        recipes: this.recipes
    };
}
