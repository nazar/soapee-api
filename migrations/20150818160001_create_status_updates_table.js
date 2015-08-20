exports.up = function ( knex ) {

    return knex.schema.createTable( 'status_updates', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();
        table.text( 'update' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'status_updates' );
};