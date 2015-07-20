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

var pathToSrc;

function pathTo() {
    return path.join( __dirname, path.join.apply( path, arguments ) );
}

pathToSrc = _.partial( pathTo, 'src' );


module.exports = function( options ) {
    var config = {
        entry: options.entry,
        target: 'node',
        output: {
            path: options.outputPath,
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
                controllers: pathToSrc( 'controllers' ),
                exceptions: pathToSrc( 'exceptions' ),
                middleware: pathToSrc( 'middleware' ),
                models: pathToSrc( 'models' ),
                routes: pathToSrc( 'routes' ),
                services: pathToSrc( 'services' ),
                utils: pathToSrc( 'utils' ),

                db: pathToSrc( 'db' ),
                app: pathToSrc( 'app.js' )
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

    _.each( options.aliases, function(aliasPath, aliasName) {
        config.resolve.alias[ aliasName ] = pathTo( aliasPath );
    } );

    return config;
};