import request from 'supertest';
import app from 'app';

describe( '/api', () => {

    describe( '/auths', () => {

        describe( 'local signups', () => {

            it( 'should validate username and password fields - no spaces', done => {
                request( app )
                    .post( '/api/auths/' )
                    .send( {
                        provider: 'local',
                        userDetails: {
                            username: 'te',
                            password: 'test password'
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 422 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'message', 'Validation failed' );
                        res.body.should.have.property( 'errorType', 'validation' );
                        res.body.should.have.property( 'fields' );

                        res.body.fields.should.have.property( 'username' );
                        res.body.fields.should.have.property( 'password' );

                        res.body.fields.username.should.be.Array();
                        res.body.fields.password.should.be.Array();

                        err ? done( err ) : done();
                    } );

            } );

            it( 'should signup a local user', done => {
                request( app )
                    .post( '/api/auths/' )
                    .send( {
                        provider: 'local',
                        userDetails: {
                            username: 'test-user',
                            password: 'test-password'
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'name', 'test-user' );

                        err ? done( err ) : done();
                    } );

            } );


        } );


    } );
} );

