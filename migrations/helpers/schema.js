module.exports.addColumn = function( table, column, type ) {
    return this.raw( 'ALTER TABLE recipes ADD COLUMN "' + column + '" ' + type + ';' );
};

module.exports.removeColumn = function( table, column ) {
    return this.raw( 'ALTER TABLE ' + table + ' DROP COLUMN IF EXISTS "' + column + '";' );
};
