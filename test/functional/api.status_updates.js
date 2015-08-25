import request from 'supertest';
import app from 'app';
import login from 'test-helpers/login';


describe( '/api', () => {

    describe( '/status-updates', () => {

        describe( 'Comments', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            describe( 'Commentables', () => {

                it( 'should add a comment to a status update', done => {
                    agent
                        .post( '/api/status-updates/1/comments' )
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

                it( 'should get feedable comments', done => {
                    agent
                        .get( '/api/status-updates/1/comments' )
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
} );

