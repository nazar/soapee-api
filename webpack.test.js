var path = require( 'path' );

var webpackDevConfig = {
    overrides: {
        entry: './test/index.js',
        output: {
            path: path.join( __dirname, 'test.build' )
        }
    },

    aliases: {
        'test-helpers': path.join('test', 'helpers')
    }
};

module.exports = require( './webpack.config' )( webpackDevConfig );