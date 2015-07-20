import { Recipes } from 'models/recipe';

export default class {

    execute() {
        return Recipes
            .forge()
            .fetch( {
                withRelated: [ 'user' ]
            } );
    }
}

//////////////////
////// Private

