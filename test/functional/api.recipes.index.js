import request from 'supertest';
import app from 'app';


describe( '/api', () => {

    describe( '/recipes', () => {

        describe( 'GET', () => {

            it( 'should return a list of recipes', done => {
                request( app )
                    .get( '/api/recipes/' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {

                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

