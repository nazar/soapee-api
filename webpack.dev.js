var path = require( 'path' );

var webpackDevConfig = {
    entry: './src/index.js',
    outputPath: path.join( __dirname, 'build' )
};

module.exports = require( './webpack.config' )( webpackDevConfig );