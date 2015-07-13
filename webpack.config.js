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
    devtool: '#cheap-module-source-map',
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
            controllers: pathTo( 'controllers' ),
            middleware: pathTo( 'middleware' ),
            models: pathTo( 'models' ),
            routes: pathTo( 'routes' ),
            services: pathTo( 'services' ),
            utils: pathTo( 'utils' ),

            db: pathTo( 'db' )
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