var schema = require( './helpers/schema' );

exports.up = function ( knex ) {
    return schema.addColumn.call( knex, 'verifications', 'reset_hash', 'varchar(255)' )
        .then( function(){ return schema.addColumn.call( knex, 'verifications', 'reset_code', 'varchar(20)' ); } );
};

exports.down = function ( knex ) {
    return schema.removeColumn.call( knex, 'verifications', 'reset_hash' )
        .then( function() { return schema.removeColumn.call( knex, 'verifications', 'reset_code' ); } );
};
