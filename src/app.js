import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import logger from 'morgan';
import express from 'express';
import cors from 'cors';

import sessions from 'middleware/sessions';
import config from 'config';

import routes from './routes';

let app = express();

//middlewares
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cors( config.cors ) );
app.use( sessions );

app.use( '/api', routes );

if ( app.get( 'env' ) === 'development' ) {
    app.use( errorHandler() );
}

let server = app.listen( 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Listening on http://%s:%s', host, port );
} );