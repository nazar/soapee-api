import _ from 'lodash';
import Knex from 'knex';
import config from 'config';

let dbConfig = _.extend( {}, config.dbConfig, {
    debug: true
} );

export default Knex( dbConfig );
