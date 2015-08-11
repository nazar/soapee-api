exports.up = function ( knex, Promise ) {
    return Promise.resolve( knex.select().from( 'recipes' ) )
        .each( function ( row ) {
            var packet;

            packet = {
                kohPurity: row.kohPurity,
                ratioNaoh: row.ratioNaoh,
                ratioKoh: row.ratioKoh,
                soapType: row.soapType,
                superFat: row.superFat,
                totalUom: row.totalUom,
                totalWeight: row.totalWeight,
                uom: row.uom,
                waterRatio: row.waterRatio,
                recipeLyeConcentration: row.recipeLyeConcentration,
                lyeCalcType: row.lyeCalcType
            };

            return knex( 'recipes' )
                .where( { id: row.id } )
                .update( {
                    settings: packet
                } );

        } );
};

exports.down = function ( knex ) {
    return knex( 'recipes' )
        .update( {
            settings: null
        } );
};
