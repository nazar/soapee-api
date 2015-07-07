import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import logger from 'morgan';
import express from 'express';

import routes from './routes';

let app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( '/api', routes );

if ( app.get( 'env' ) === 'development' ) {
    app.use( errorHandler() );
}

let server = app.listen( 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Listening at http://%s:%s', host, port );
} );