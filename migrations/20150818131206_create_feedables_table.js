exports.up = function ( knex ) {

    return knex.schema.createTable( 'feedables', function ( table ) {
        table.increments().primary();

        table.integer( 'feedable_id' ).index();
        table.string( 'feedable_type' );

        table.json( 'feedable_meta', true );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'feedables' );
};