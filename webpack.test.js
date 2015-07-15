var path = require( 'path' );

var webpackDevConfig = {
    entry: './test/index.js',
    outputPath: path.join( __dirname, 'test.build' )
};

module.exports = require( './webpack.config' )( webpackDevConfig );