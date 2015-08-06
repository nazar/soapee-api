exports.up = function ( knex ) {


    function addColumn( column, type, defaultValue ) {
        return function () {
            return knex.raw( 'ALTER TABLE recipes ADD COLUMN "' + column + '" ' + type + ' default \'' + defaultValue + '\';' );
        };
    }

    return addColumn( 'lyeCalcType', 'varchar(15)', 'ratio'  )()
        .then( addColumn( 'recipeLyeConcentration', 'real', '30'  ) )


};

exports.down = function ( knex ) {

    return knex.raw( 'ALTER TABLE recipes DROP COLUMN IF EXISTS "lyeCalcType";' )
        .then( function () {
            return knex.raw( 'ALTER TABLE recipes DROP COLUMN IF EXISTS "recipeLyeConcentration";' )
        } )

};
