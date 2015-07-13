import bookshelf from 'db/bookshelf';

import {User} from 'models/users';

export let Verification = bookshelf.Model.extend( {
    tableName: 'verifications',
    hasTimestamps: true,

    //relations
    user() {
        return this.belongsTo( User );
    }
} );

export let Verifications = bookshelf.Collection.extend( {
    model: Verification
} );