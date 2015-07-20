exports.up = function ( knex ) {

    return knex.schema.createTable( 'recipes', function ( table ) {
        table.increments().primary();

        table.integer( 'user_id' ).index();
        table.string( 'name' );
        table.string( 'description' );
        table.text( 'notes' );

        table.float( 'kohPurity' );
        table.float( 'superFat' );
        table.float( 'totalWeight' );
        table.float( 'waterRatio' );

        table.string( 'soapType' );
        table.string( 'uom' );
        table.string( 'totalUom' );

        table.specificType( 'oils', 'integer[]' );

        table.json( 'weights', true );
        table.json( 'summary', true );

        table.timestamps();
    } );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'recipes' );
};
