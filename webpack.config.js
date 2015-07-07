var _ = require( 'lodash' );
var path = require( 'path' );
var webpack = require( 'webpack' );
var fs = require( 'fs' );

var nodeModules = _( fs.readdirSync( 'node_modules' ) )
    .filter( function ( x ) {
        return [ '.bin' ].indexOf( x ) === -1;
    } )
    .transform( function ( result, mod ) {
        result[ mod ] = 'commonjs ' + mod;
    }, {} )
    .value();

function pathTo() {
    return path.join( __dirname, 'src', path.join.apply( path, arguments ) );
}


module.exports = {
    entry: './src/app.js',
    target: 'node',
    output: {
        path: path.join( __dirname, 'build' ),
        filename: 'api.js'
    },
    devtool: '#eval-source-map',
    debug: true,
    externals: nodeModules,
    node: {
        __filename: true,
        __dirname: true
    },
    plugins: [
        new webpack.BannerPlugin( 'require("source-map-support").install();',
            { raw: true, entryOnly: false } )
    ],
    resolve: {
        extensions: [ '', '.js', '.jsx' ],
        alias: {
            //application aliases
            models: pathTo( 'models' ),
            mixins: pathTo( 'mixins' ),
            mocks: pathTo( 'mocks' ),
            utils: pathTo( 'utils' ),

            assets: pathTo( 'assets' )
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: path.join( __dirname, 'node_modules' )
            }
        ]
    }
};