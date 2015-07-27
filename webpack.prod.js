var webpack = require( 'webpack' );

var webpackDevConfig = {
    overrides: {
        devtool: 'source-map',
        output: {
            filename: 'index.js'
        }
    },

    plugins: [
        new webpack.DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( 'production' )
            }
        } ),
        new webpack.optimize.UglifyJsPlugin( {
            minimize: true,
            sourceMap: true
        } )
    ]

};

module.exports = require( './webpack.config' )( webpackDevConfig );