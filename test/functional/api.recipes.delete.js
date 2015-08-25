import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    describe( '/recipes', () => {

        describe( 'delete recipe', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            it( 'should delete a recipe', done => {
                agent
                    .del( '/api/recipes/6' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err ) {
                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

