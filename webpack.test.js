var path = require( 'path' );

var webpackDevConfig = {
    entry: './test/index.js',
    outputPath: path.join( __dirname, 'test.build' ),
    aliases: {
        'test-helpers': path.join('test', 'helpers')
    }
};

module.exports = require( './webpack.config' )( webpackDevConfig );