exports.up = function ( knex ) {

    return knex.schema.createTable( 'users', function ( table ) {
        table.increments().primary();

        table.string( 'name' );
        table.string( 'image_url' );
        table.text( 'about' );

        table.timestamp( 'last_logged_in' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'users' );
};