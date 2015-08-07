import app from './app';

app.enable('trust proxy');
app.set('trust proxy', '127.0.0.1');

let server = app.listen( 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Listening on http://%s:%s', host, port );
} );