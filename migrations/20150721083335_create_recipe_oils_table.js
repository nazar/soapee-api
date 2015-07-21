exports.up = function ( knex ) {

    return knex.schema.createTable( 'recipe_oils', function ( table ) {
        table.increments().primary();

        table.integer( 'recipe_id' ).index();
        table.integer( 'oil_id' ).index();
        table.float( 'weight' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'recipe_oils' );
};