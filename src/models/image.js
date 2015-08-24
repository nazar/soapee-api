import _ from 'lodash';
import path from 'path';
import bookshelf from 'db/bookshelf';

import { Recipe } from 'models/recipe';
import { StatusUpdate } from 'models/statusUpdate';
import { User } from 'models/user';

export let Image = bookshelf.Model.extend( {
    tableName: 'images',
    hasTimestamps: true,

    virtuals: {
        path() {
            return path.join( this.get( 'imageable_type' ), Image.partitionId( this.get( 'imageable_id' ) ) );
        }
    },

    user() {
        return this
            .belongsTo( User );
    },

    imageable() {
        return this.morphTo( 'imageable', Recipe, StatusUpdate );
    }

}, {
    partitionId( imageableId ) {
        let id = imageableId.toString();

        return _.words( _.padLeft( id, 9, '0' ), /\d{3}/g ).join( '/' );
    }
} );

export let Images = bookshelf.Collection.extend( {
    model: Image
} );