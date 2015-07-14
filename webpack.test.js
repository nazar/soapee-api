var path = require( 'path' );

var webpackDevConfig = {
    entry: './test/index.js',
    outputPath: path.join( __dirname, 'test.build' ),
    aliases: {
        app: 'app.js'
    }
};

module.exports = require( './webpack.config' )( webpackDevConfig );