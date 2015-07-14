export default class RecordNotFoundError extends Error {

    constructor( message = 'Record not found' ) {
        super( message );
    }

    get name() {
        return 'RecordNotFoundError';
    }

}