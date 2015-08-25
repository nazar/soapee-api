import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

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

        describe( 'GET non public recipes', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            it( 'should allow friends to see recipes', done => {
                agent
                    .get( '/api/recipes/2' )
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

