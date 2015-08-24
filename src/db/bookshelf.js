import Bookshelf from 'bookshelf';
import knex from 'db/knex';

let bookshelf = Bookshelf( knex );

bookshelf.plugin('virtuals');

export default bookshelf;