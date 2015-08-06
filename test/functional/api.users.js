import request from 'supertest';
import app from 'app';


describe( '/api', () => {

    describe( '/users', () => {

        describe( 'GET /users/:id', () => {

            it( 'should return a user profile', done => {
                request( app )
                    .get( '/api/users/1' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Object();
                        res.body.should.have.property( 'name' );

                        err ? done( err ) : done();
                    } );

            } );

        } );

        describe( 'GET /users/:id/recipes', () => {

            it( 'should return user public recipes', done => {
                request( app )
                    .get( '/api/users/1/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        res.body[0].should.have.property( 'name' );
                        res.body[0].oils.should.be.Array();

                        err ? done( err ) : done();
                    } );

            } );

        } );

        describe( 'GET /users/:id/friends', () => {

            it( 'should return user friends', done => {
                request( app )
                    .get( '/api/users/1/friends' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );
                        res.body.should.be.Array();

                        res.body[0].should.have.property( 'name' );

                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

