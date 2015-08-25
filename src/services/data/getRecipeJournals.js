import { RecipeJournal, RecipeJournals } from 'models/recipeJournal';

export default class {

    constructor( options = {} ) {
        this.recipeId = options.recipeId;

        this.limit = options.limit || 10;
        this.offset = options.offset || this.limit * options.page;
    }

    execute() {
        return getJournalsCount.call( this )
            .bind( this )
            .then( setCount )
            .then( getJournals )
            .then( returnJournals );
    }
}

//////////////////
////// Private

function getJournalsCount() {
    return RecipeJournal
        .query( qb => {
            qb
                .count( 'id' )
                .where( {
                    recipe_id: this.recipeId
                } );
        } )
        .fetch();
}

function setCount( count ) {
    this.count = count;
}

function getJournals() {
    return RecipeJournals
        .query( qb => {
            qb
                .where( { recipe_id: this.recipeId } )
                .orderBy( 'created_at', 'desc' )
                .offset( this.offset )
                .limit( this.limit );
        } )
        .fetch( {
            withRelated: [ 'images' ]
        } );
}

function returnJournals( journals ) {
    return {
        count: this.count.get( 'count' ),
        journals: journals
    };
}
