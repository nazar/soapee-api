export default function ( res ) {
    return e => {
        res
            .status( 404 )
            .send( { error: e.message });
    };
}