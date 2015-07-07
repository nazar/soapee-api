var _ = require( 'lodash' );
var config = require( 'config' );

module.exports = _.extend( {}, config.dbConfig, {
    migrations: {
        tableName: 'knex_migrations'
    }
} );
