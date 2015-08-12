var _ = require( 'lodash' );
var schema = require( './helpers/schema' );

var columns = {
    properties: 'JSONB',
    saturations: 'JSONB'
};

exports.up = function ( knex, Promise ) {

    return Promise.resolve( _.keys( columns ) )
        .each( function ( column ) {
            return schema.removeColumn.call( knex, 'oils', column );
        } );

};

exports.down = function ( knex, Promise ) {

    return Promise.resolve( _.keys( columns ) )
        .each( function ( column ) {
            return schema.addColumn.call( knex, 'oils', column, columns[ column ] );
        } );

};