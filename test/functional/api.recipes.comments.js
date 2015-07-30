import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    describe( '/recipes', () => {

        let agent = request.agent( app );

        before( function ( done ) {
            login( agent, () => {
                done();
            } );
        } );

        describe( 'Comments', () => {

            it( 'should add a comment to a recipe', done => {
                agent
                    .post( '/api/recipes/1/comments' )
                    .send( {
                        comment: 'test description 1 2 3 4 5'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {

                        res.body.should.have.property( 'id' );
                        res.body.should.have.property( 'comment' );

                        err ? done( err ) : done();
                    } );

            } );

            it( 'should get recipe comments', done => {
                agent
                    .get( '/api/recipes/1/comments' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.an.Array();
                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

