exports.up = function ( knex ) {

    return knex.schema.createTable( 'favourite_recipes', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();
        table.integer( 'recipe_id' ).index();

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'favourite_recipes' );
};