import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import logger from 'morgan';

import express from 'express';


let app = express();

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

//after routes
if ( app.get( 'env' ) === 'development' ) {
    app.use( errorHandler() );
}

app.get( '/', function ( req, res ) {
    res.send( 'Hello World!!' );
} );

let server = app.listen( 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Example app listening at http://%s:%s', host, port );

} );
