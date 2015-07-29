exports.up = function ( knex ) {

    function addColumn( column ) {
        return function () {
            return knex.raw( 'ALTER TABLE recipes ADD COLUMN "' + column + '" real;' );
        };
    }

    return addColumn( 'ratioNaoh' )()
        .then( addColumn( 'ratioKoh' ) );

};

exports.down = function ( knex ) {

    function removeColumn( column ) {
        return function () {
            return knex.raw( 'ALTER TABLE recipes DROP COLUMN IF EXISTS "' + column + '";' );
        };
    }

    return removeColumn( 'ratioNaoh' )()
        .then( removeColumn( 'ratioKoh' ) );

};
