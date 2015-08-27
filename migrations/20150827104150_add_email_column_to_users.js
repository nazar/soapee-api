var schema = require( './helpers/schema' );

exports.up = function ( knex ) {
    return schema.addColumn.call(knex, 'users', 'email', 'varchar(100)');
};

exports.down = function ( knex ) {
    return schema.removeColumn.call( knex, 'users', 'email' );
};
