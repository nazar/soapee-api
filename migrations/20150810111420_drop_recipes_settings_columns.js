var _ = require( 'lodash' );
var schema = require( './helpers/schema' );

var columns = {
    kohPurity: 'real',
    ratioNaoh: 'real',
    ratioKoh: 'real',
    soapType: 'VARCHAR(255)',
    superFat: 'real',
    totalUom: 'VARCHAR(255)',
    totalWeight: 'real',
    uom: 'VARCHAR(255)',
    waterRatio: 'real',
    recipeLyeConcentration: 'real',
    lyeCalcType: 'VARCHAR(15)'
};

exports.up = function ( knex, Promise ) {

    return Promise.resolve( _.keys( columns ) )
        .each( function ( column ) {
            return schema.removeColumn.call( knex, 'recipes', column );
        } );

};

exports.down = function ( knex, Promise ) {

    return Promise.resolve( _.keys( columns ) )
        .each( function ( column ) {
            return schema.addColumn.call( knex, 'recipes', column, columns[ column ] );
        } );

};