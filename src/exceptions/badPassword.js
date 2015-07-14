export default class BadPasswordError extends Error {

    constructor( message = 'Invalid Password' ) {
        super( message );
    }

    get name() {
        return 'BadPasswordError';
    }

}