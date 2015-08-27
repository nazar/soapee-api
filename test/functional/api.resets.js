import request from 'supertest';
import app from 'app';


describe( '/api', () => {

    describe( '/resets', () => {

        describe( 'POST request-reset', () => {

            it( 'should send a verification email', done => {
                request( app )
                    .post( '/api/resets/request-reset' )
                    .send( {
                        email: 'uuu@uu.com'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'token' );

                        err ? done( err ) : done();
                    } );

            } );

        } );

        describe( 'POST verify', () => {

            it( 'should verify a reset code', done => {
                request( app )
                    .post( '/api/resets/verify' )
                    .send( {
                        token: '$2a$10$grk002wsI.VYPqvRwUTXFeipXv.Jn3IE9Q5gBj6T7K52zyWp7xtdq',
                        code: '7410-5496'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'valid' );
                        res.body.valid.should.equal( true );

                        err ? done( err ) : done();
                    } );

            } );

        } );

        describe( 'POST reset-password', () => {

            it( 'should reset a password', done => {
                request( app )
                    .post( '/api/resets/reset-password' )
                    .send( {
                        token: '$2a$10$grk002wsI.VYPqvRwUTXFeipXv.Jn3IE9Q5gBj6T7K52zyWp7xtdq',
                        code: '7410-5496',
                        password: 'new-password'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );
                        res.body.should.have.property( 'done' );
                        res.body.done.should.equal( true );

                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

