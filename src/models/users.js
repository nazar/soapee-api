import bookshelf from 'db/bookshelf';

import {Verification} from 'models/verifications';

export let User = bookshelf.Model.extend( {
    tableName: 'users',
    hasTimestamps: true,

    //relations
    verifications() {
        return this.hasMany( Verification );
    }

} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );