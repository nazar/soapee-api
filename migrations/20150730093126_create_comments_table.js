exports.up = function ( knex ) {

    return knex.schema.createTable( 'comments', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();
        table.integer( 'commentable_id' ).index();

        table.string( 'commentable_type' );
        table.string( 'comment', 2000 );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'comments' );
};
