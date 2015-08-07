import Exception from 'exceptions/exception';

export default class RecordNotFoundError extends Exception {

    constructor( message = 'Record not found' ) {
        super( message );
    }

    get name() {
        return 'RecordNotFoundError';
    }

    get status() {
        return 404;
    }

}