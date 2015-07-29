exports.up = function ( knex ) {

    return knex.raw( 'ALTER TABLE recipes ADD COLUMN visibility smallint default 1;' );

};

exports.down = function ( knex ) {

    return knex.raw( 'ALTER TABLE recipes DROP COLUMN IF EXISTS visibility;' );

};
