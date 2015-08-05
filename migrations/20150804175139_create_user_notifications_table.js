exports.up = function ( knex ) {

    return knex.schema.createTable( 'user_notifications', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).notNullable().index();

        table.smallint( 'type' ).notNullable();
        table.boolean( 'read' ).defaultTo( false ).notNullable();

        table.text( 'message' );

        table.timestamp( 'read_on' );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'user_notifications' );
};
