import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    describe( '/recipes/:id/journals', () => {

        describe( 'GET', () => {

            it( 'should return a specific recipe journals', done => {
                request( app )
                    .get( '/api/recipes/158/journals' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Object();

                        res.body.count.should.be.above( 0 );
                        res.body.journals.should.be.Array();

                        err ? done( err ) : done();
                    } );

            } );

        } );


        describe( 'Updating', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            describe( 'POST', () => {

                it( 'should create a recipe journal', done => {
                    agent
                        .post( '/api/recipes/158/journals' )
                        .send( {
                            journal: 'this is an entry'
                        } )
                        .expect( 'Content-Type', /json/ )
                        .expect( 200 )
                        .end( function ( err, res ) {
                            res.body.should.be.Object();
                            err ? done( err ) : done();
                        } );

                } );

            } );

            describe( 'PUT', () => {

                it( 'should update a recipe journal', done => {
                    agent
                        .put( '/api/recipes/158/journals/1' )
                        .send( {
                            journal: 'this is an entry2'
                        } )
                        .expect( 'Content-Type', /json/ )
                        .expect( 200 )
                        .end( function ( err, res ) {
                            res.body.should.be.Object();
                            res.body.journal.should.equal( 'this is an entry2' );

                            err ? done( err ) : done();
                        } );

                } );

            } );

            describe( 'DELETE', () => {

                it( 'should delete a recipe journal', done => {
                    agent
                        .del( '/api/recipes/158/journals/1' )
                        .expect( 'Content-Type', /json/ )
                        .expect( 200 )
                        .end( function ( err, res ) {
                            console.log('body', res.body );
                            err ? done( err ) : done();
                        } );

                } );
            } );


        } );


    } );

} );

