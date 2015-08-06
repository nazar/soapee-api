import Exception from 'exceptions/exception';

export default class RecordNotFoundError extends Exception {

    constructor( message = 'Record not found' ) {
        super( message );
    }

    get status() {
        return 404;
    }

}