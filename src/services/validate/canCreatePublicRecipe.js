import NeedsSocialAccount from 'exceptions/needsSocialAccount';

import { User } from 'models/user';

export default class {

    constructor( payload ) {
        this.recipe = payload.recipe;
    }

    execute() {
        return User
            .forge({
                id: this.recipe.user_id
            })
            .fetch({
                withRelated: ['verifications']
            })
            .then(user => {
                let localOnly = user
                        .related( 'verifications' )
                        .filter( user => user.get('provider_name') === 'local' )
                        .length === 1;

                if (localOnly && this.recipe.visibility === 1) {
                    throw new NeedsSocialAccount('Must register with Google or Facebook to post public recipes. Set recipe visibility as either Private or Friends to save.');
                }
            })
    }
}