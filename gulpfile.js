var path = require( 'path' );
var gulp = require( 'gulp' );
var webpack = require( 'webpack' );
var nodemon = require( 'nodemon' );
var mocha = require( 'gulp-mocha' );
var runSequence = require( 'run-sequence' );
var clean = require( 'gulp-clean' );
var shipitCaptain = require( 'shipit-captain' );

var devWebpackConfig = require( './webpack.dev' );
var testWebpackConfig = require( './webpack.test' );
var prodWebpackConfig = require( './webpack.prod' );

gulp.task( 'default', [ 'run' ] );

gulp.task( 'build', function ( done ) {
    webpack( devWebpackConfig ).run( onBuild( done ) );
} );

gulp.task( 'build:production', function ( done ) {
    runSequence(
        'clean:build',
        'cp:assets',
        'build:webpack:production',
        done
    );
} );

gulp.task( 'build:test', function ( done ) {
    webpack( testWebpackConfig ).run( onBuild( done ) );
} );


gulp.task( 'build:webpack:production', function ( done ) {
    webpack( prodWebpackConfig ).run( onBuild( done ) );
} );

gulp.task( 'clean:build', function () {
    return gulp.src( 'build/*', { read: false } )
        .pipe( clean() );
} );

gulp.task( 'cp:assets', function () {
    return gulp.src( [
        './package.json'
    ] )
        .pipe( gulp.dest( 'build/' ) );
} );

gulp.task( 'watch', [ 'build' ], function () {
    return webpack( devWebpackConfig ).watch( 250, function ( err, stats ) {
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

gulp.task( 'test', [ 'build:test' ], function () {
    return gulp.src( path.join( __dirname, 'test.build/api.js' ), { read: false } )
        .pipe( mocha( { reporter: 'spec' } ) )
        .once( 'end', process.exit.bind( process ) );
} );


gulp.task( 'deploy', [ 'build:production' ], function ( done ) {
    var options = {
        init: require( './deploy/shipit' ).init,
        run: 'deploy-local',
        targetEnv: 'production',
        confirm: false
    };

    shipitCaptain( require( './deploy/shipit' ).config, options, done );
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