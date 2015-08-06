import Exception from 'exceptions/exception';

export default class BadPasswordError extends Exception {

    constructor( message = 'Invalid Password' ) {
        super( message );
    }

    get status() {
        return 401;
    }

}