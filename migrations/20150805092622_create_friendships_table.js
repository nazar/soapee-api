exports.up = function ( knex ) {

    return knex.schema.createTable( 'friendships', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).notNullable();
        table.integer( 'friend_id' ).notNullable().index();

        table.timestamps();
    } )
    .then(
        function() {
            return knex.raw( 'ALTER TABLE friendships ADD CONSTRAINT friendships_prevent_duplicate_requests UNIQUE( user_id, friend_id )' );
        }
    );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'friendships' );
};
