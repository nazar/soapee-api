var path = require( 'path' );

var webpackDevConfig = {
    overrides: {
        entry: './src/index.js',
        output: {
            path: path.join( __dirname, 'build' )
        }
    }
};

module.exports = require( './webpack.config' )( webpackDevConfig );