import _ from 'lodash';
import Knex from 'knex';
import Bookshelf from 'bookshelf';
import config from 'config';

let dbConfig = _.extend( {}, config.dbConfig, {
    debug: true
} );

let knex = Knex( dbConfig );

export default Bookshelf( knex );