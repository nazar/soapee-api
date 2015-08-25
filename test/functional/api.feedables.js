import request from 'supertest';
import app from 'app';
import login from 'test-helpers/login';


describe( '/api', () => {

    describe( '/feedables', () => {

        describe( 'GET', () => {

            it( 'should return feedables list', done => {
                request( app )
                    .get( '/api/feedables' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();

                        res.body[0].should.be.Object();

                        res.body[0].should.have.property( 'id' );
                        res.body[0].should.have.property( 'feedable_id' );

                        err ? done( err ) : done();
                    } );

            } );

        } );

        describe( 'Comments', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            describe( 'Commentables', () => {

                it( 'should add a comment to an feedable', done => {
                    agent
                        .post( '/api/feedables/1/comments' )
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

                it( 'shouldn\'t add a comment to an feedable comment', done => {
                    agent
                        .post( '/api/feedables/6/comments' )
                        .send( {
                            comment: 'test description 1 2 3 4 5'
                        } )
                        .expect( 'Content-Type', /json/ )
                        .expect( 422 )
                        .end( function ( err ) {
                            err ? done( err ) : done();
                        } );

                } );

                it( 'should get feedable comments', done => {
                    agent
                        .get( '/api/feedables/1/comments' )
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

