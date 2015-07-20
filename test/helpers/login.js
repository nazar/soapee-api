export default function ( agent, done ) {
    agent
        .post( '/api/auths/login' )
        .send( {
            username: 'testing',
            password: 'testing'
        } )
        .expect( 200 )
        .end( function ( err, res ) {
            if ( err ) {
                throw err;
            }
            agent.saveCookies( res );
            done( agent );
        } );
}
