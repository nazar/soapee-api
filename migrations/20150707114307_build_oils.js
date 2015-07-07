var oilsSeed = require( '../seed/oils.js' );

exports.up = function ( knex ) {

    return knex.schema.createTable( 'oils', function ( table ) {
        table.increments();

        table.string( 'name' );
        table.integer( 'version' );
        table.integer( 'iodine' );
        table.integer( 'ins' );
        table.float( 'sap' );
        table.integer( 'total_saponifiable' );

        table.json( 'breakdown' );
        table.json( 'properties' );
        table.json( 'saturations' );

        table.timestamps();
    } )
    .then( loadOils( knex ) );

};

exports.down = function ( knex ) {
    return knex.schema.dropTable( 'oils' );
};


function loadOils( knex ) {
    return function() {
        return knex( 'oils' ).insert( oilsSeed );
    };
}