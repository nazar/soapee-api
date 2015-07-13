import session from 'express-session';
import SessionStore from 'connect-session-knex';

import knex from 'db/knex';
import config from 'config';


let KnexSessionStore;
let store;


//sessions
KnexSessionStore = SessionStore( session );
store = new KnexSessionStore( {
    knex
} );

export default session( {
    secret: config.sessionStore.secret,
    resave: true,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: config.sessionStore.cookieMaxAge
    },
    store
} );