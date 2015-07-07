var path = require( 'path' );
var gulp = require( 'gulp' );
var webpack = require( 'webpack' );
var nodemon = require( 'nodemon' );
var webpackConfig = require( './webpack.config' );

gulp.task( 'default', [ 'run' ] );

gulp.task( 'build', function ( done ) {
    webpack( webpackConfig ).run( onBuild( done ) );
} );

gulp.task( 'watch', [ 'build' ], function () {
    webpack( webpackConfig ).watch( 250, function ( err, stats ) {
        onBuild()( err, stats );
        nodemon.restart();
    } );
} );

gulp.task( 'run', [ 'watch' ], function () {
    nodemon( {
        execMap: {
            js: 'node'
        },
        script: path.join( __dirname, 'build/api' ),
        ignore: [ '*' ],
        watch: [ 'foo/' ],
        ext: 'noop'
    } ).on( 'restart', function () {
        console.log( 'Restarted!' );
    } );
} );


function onBuild( done ) {
    return function ( err, stats ) {
        if ( err ) {
            console.log( 'Error', err );
        }
        else {
            console.log( stats.toString() );
        }
        if ( done ) {
            done();
        }
    };
}