import bookshelf from 'db';

import {User} from 'models/users';

export let Verification = bookshelf.Model.extend( {
    tableName: 'verifications',

    //relations
    user() {
        return this.belongsTo( User );
    }
} );

export let Verifications = bookshelf.Collection.extend( {
    model: Verification
} );