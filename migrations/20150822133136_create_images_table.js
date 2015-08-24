exports.up = function ( knex ) {

    return knex.schema.createTable( 'images', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();

        table.string( 'file_name' );

        table.integer( 'imageable_id' ).index();
        table.string( 'imageable_type' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'images' );
};