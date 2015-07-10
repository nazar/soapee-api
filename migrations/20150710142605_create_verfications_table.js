exports.up = function ( knex ) {

    return knex.schema.createTable( 'verifications', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();
        table.string( 'provider_id' );
        table.string( 'provider_name' ).index();
        table.string( 'hash' ).index();

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'verifications' );
};
