exports.up = function ( knex ) {

    return knex.schema.createTable( 'recipe_journals', function ( table ) {
        table.increments().primary();

        table.integer( 'recipe_id' ).index();
        table.text( 'journal' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'recipe_journals' );
};