import request from 'supertest';
import app from 'app';


describe( '/api', () => {

    describe( '/oils/:id', () => {

        describe( 'GET', () => {

            it( 'should return a specific oil', done => {
                request( app )
                    .get( '/api/oils/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Object();
                        res.body.should.have.property( 'name' );

                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

