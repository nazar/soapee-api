export default function( response ) {
    return result => {
        response.json( result );
    };
}