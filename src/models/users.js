import bookshelf from 'db';
import md5 from 'js-md5';

import {Verification} from 'models/verifications';

export let User = bookshelf.Model.extend( {
    tableName: 'users',

    initialize() {
        this.on( 'saving', this.setUserKey );
    },

    //relations
    verifications() {
        return this.hasMany( Verification );
    },

    //setters
    setUserKey() {
        if ( !(this.get( 'key' )) ) {
            this.set( 'key', md5( new Date().toString() ) );
        }
    }
} );

export let Users = bookshelf.Collection.extend( {
    model: User
} );