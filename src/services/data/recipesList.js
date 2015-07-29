import { Recipes } from 'models/recipe';

export default class {

    execute() {
        return Recipes
            .query( {
                where: {
                    visibility: 1
                }
            } )
            .fetch( {
                withRelated: [ 'user', 'oils' ]
            } );
    }
}

//////////////////
////// Private

