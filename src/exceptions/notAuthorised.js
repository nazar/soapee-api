import Exception from 'exceptions/exception';

export default class NotAuthorisedError extends Exception {

    constructor( message = 'Not Authorised' ) {
        super( message );
    }

    get name() {
        return 'NotAuthorisedError';
    }

    get status() {
        return 403;
    }

}