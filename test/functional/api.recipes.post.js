import request from 'supertest';

import app from 'app';
import login from 'test-helpers/login';

describe( '/api', () => {

    describe( '/recipes', () => {

        describe( 'Saving recipes', () => {

            let agent = request.agent( app );

            before( function ( done ) {
                login( agent, () => {
                    done();
                } );
            } );

            it.only( 'should save a recipe', done => {
                agent
                    .post( '/api/recipes/' )
                    .send( {
                        name: '213213123',
                        description: 'test description 1 2 3 4 5',
                        notes: `&#60&#115&#99&#114&#105&#112&#116&#62&#97&#108&#101&#114&#116&#60&#47&#115&#99&#114&#105&#112&#116&#62`,
                        kohPurity: 90,
                        soapType: 'noah',
                        superFat: 5,
                        totalUom: 'gram',
                        totalWeight: 500,
                        uom: 'gram',
                        waterRatio: 38,
                        oils: [ 1, 2 ],
                        weights: { 1: '1', 2: '2' },
                        summary: {
                            totals: {
                                totalOilWeight: 3,
                                totalWaterWeight: 1.1400000000000001,
                                totalLye: 0.369,
                                totalBatchWeight: 4.509,
                                lyeConcentration: 24.45328031809145,
                                waterLyeRatio: 3.0894308943089435
                            },
                            breakdowns: {
                                palmitic: 7,
                                stearic: 10.666666666666666,
                                oleic: 44.666666666666664,
                                linoleic: 14.333333333333332,
                                linolenic: 1.3333333333333333,
                                myristic: 0.6666666666666666
                            },
                            properties: {
                                hardness: 18.333333333333332,
                                cleansing: 0.6666666666666666,
                                bubbly: 0.6666666666666666,
                                stable: 17.666666666666668,
                                condition: 60.33333333333333,
                                iodine: 79.33333333333333,
                                ins: 101.99999999999999
                            },
                            saturations: { saturated: 18.333333333333332, unsaturated: 60.33333333333333 }
                        }
                    } )
                    .expect( 'Content-Type', /json/ )
                    .expect( 200 )
                    .end( function ( err, res ) {
                        err ? done( err ) : done();
                    } );

            } );

        } );


    } );
} );

