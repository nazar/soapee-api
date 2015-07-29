var _ = require( 'lodash' );
var config = require( 'config' );

var result = {};

result[ process.env.NODE_ENV || 'development' ] = _.extend( {}, config.dbConfig, {
    migrations: {
        tableName: 'knex_migrations'
    }
} );

module.exports = result;
