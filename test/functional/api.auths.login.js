import request from 'supertest';
import app from 'app';

describe( '/api', () => {

    describe( '/auths', () => {

        describe.only( 'local login', () => {

            it( 'reject invalid username', done => {
                request( app )
                    .post( '/api/auths/login' )
                    .send( {
                        provider: 'local',
                        userDetails: {
                            username: 'test-user',
                            password: 'bas-test-password'
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 401 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'errorType', 'BadPasswordError' );

                        err ? done( err ) : done();
                    } );

            } );

            it( 'reject invalid password', done => {
                request( app )
                    .post( '/api/auths/login' )
                    .send( {
                        provider: 'local',
                        userDetails: {
                            username: 'test-user',
                            password: 'bas-test-password'
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 401 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'errorType', 'BadPasswordError' );

                        err ? done( err ) : done();
                    } );

            } );

            it( 'accept valid crednetials', done => {
                request( app )
                    .post( '/api/auths/loginnn' )
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
                        //console.log('body', err );
                        err && done( err );
                        res.body.should.have.property( 'name', 'test-user' );

                        done();
                    } );

            } );


        } );


    } );
} );

