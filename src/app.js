import bodyParser from 'body-parser';
import logger from 'morgan';
import express from 'express';
import cors from 'cors';

import sessions from 'middleware/sessions';
import errorResponder from 'middleware/errorResponder';
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

//this goes last as it is an error middleware handler
app.use( errorResponder );

export default app;