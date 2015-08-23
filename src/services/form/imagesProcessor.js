import Promise from 'bluebird';
import gm from 'gm';
import path from 'path';
import mkdirp from 'mkdirp';

import { Image } from 'models/image';

import config from 'config';


export default class {

    constructor( options ) {
        this.userId = options.userId;
        this.payload = options.payload;
        this.file = options.file;

        this.newFileName = this.file.originalname;
        this.newPath;
    }

    execute() {
        return createOutputPath.call( this )
            .bind( this )
            .then( convert )
            .then( setNewPath )
            .then( createOutputPath )
            .then( thumbnail )
            .then( saveToDB )
            .then( returnPath );
    }
}

////////////////////
///// private

function createOutputPath() {
    return Promise.promisify( mkdirp )( getPathFor.call( this ) );
}

function convert() {
    return new Promise( ( resolve, reject ) => {
        let newPath = getPathFor.call( this, this.newFileName );

        gm( this.file.path )
            .noProfile()
            .resize( 640, 480 )
            .write( newPath, e => {
                if ( e ) {
                    reject( e );
                } else {
                    resolve( newPath );
                }
            } )
    } )
}

function setNewPath( newPath ) {
    this.newPath = newPath;
}

function thumbnail() {
    return new Promise( ( resolve, reject ) => {
        let thumbPath = getPathFor.call( this, 'thumb-' + this.newFileName );

        gm( this.newPath )
            .resize( 100, '100^' )
            .gravity( 'Center' )
            .extent( 100, 100 )
            .write( thumbPath, e => {
                if ( e ) {
                    reject( e );
                } else {
                    resolve();
                }
            } )
    } )
}

function saveToDB() {
    return Image
        .forge( {
            user_id: this.userId,
            imageable_id: this.payload.imageable_id,
            imageable_type: this.payload.imageable_type,
            file_name: this.newFileName
        } )
        .save()
}

function returnPath( imageable ) {
    return imageable;
}


function getPathFor( name = '' ) {
    return path.join( config.images.base, Image.partitionId( this.payload.imageable_id ), name )
}