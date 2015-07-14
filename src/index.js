import app from './app';

let server = app.listen( 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Listening on http://%s:%s', host, port );
} );