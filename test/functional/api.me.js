import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    describe( '/me', () => {

        let agent = request.agent( app );

        before( function ( done ) {
            login( agent, () => {
                done();
            } );
        } );

        describe( 'Updating', () => {

            it( 'should update a profile', done => {
                agent
                    .post( '/api/me/' )
                    .send( {
                        name: 'testing-name',
                        about: 'test description 1 2 3 4 5',
                        attack: 'lols'
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err ) {
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should add a recipe to favourites', done => {
                agent
                    .put( '/api/me/favourite/recipes/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'done' );
                        res.body.done.should.be.true;

                        err ? done( err ) : done();
                    } );
            } );

            it( 'should remove a recipe from favourites', done => {
                agent
                    .delete( '/api/me/favourite/recipes/5' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.have.property( 'done' );
                        res.body.done.should.be.true;

                        err ? done( err ) : done();
                    } );
            } );

        } );

        describe( 'Getting', () => {

            it( 'should return my recipes', done => {
                agent
                    .get( '/api/me/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        res.body.should.be.Array();
                        err ? done( err ) : done();
                    } );
            } );

            it( 'should return my favourite recipes', done => {
                agent
                    .get( '/api/me/favourite/recipes' )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        console.log('body', res.body );

                        res.body.should.be.Array();

                        err ? done( err ) : done();
                    } );
            } );

        } );


    } );
} );

