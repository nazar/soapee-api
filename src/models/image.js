import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import bookshelf from 'db/bookshelf';

import { Recipe } from 'models/recipe';
import { StatusUpdate } from 'models/statusUpdate';
import { User } from 'models/user';

import config from 'config';

export let Image = bookshelf.Model.extend( {
    tableName: 'images',
    hasTimestamps: true,

    virtuals: {
        path() {
            return path.join( this.get( 'imageable_type' ), Image.partitionId( this.get( 'imageable_id' ) ) );
        }
    },

    initialize: function () {
        this.on( 'destroying', this.deleteFiles );
    },

    deleteFiles() {
        let unlink = Promise.promisify( fs.unlink );
        let imagePath = path.join( config.images.base, this.get( 'path' ) );

        return unlink( path.join( imagePath, this.get( 'file_name' ) ) )
            .then( () => unlink( path.join( imagePath, 'thumb-' + this.get( 'file_name' ) ) ) );
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