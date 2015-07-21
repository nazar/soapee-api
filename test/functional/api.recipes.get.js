import request from 'supertest';
import app from 'app';


describe( '/api', () => {

    describe( '/recipes/:id', () => {

        describe( 'GET', () => {

            it( 'should return a specific recipe with relations', done => {
                request( app )
                    .get( '/api/recipes/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Object();

                        res.body.should.have.property( 'oils' );
                        res.body.should.have.property( 'weights' );

                        res.body.oils.should.be.Array();
                        res.body.weights.should.be.Object();

                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

