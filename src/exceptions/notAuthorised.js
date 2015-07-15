export default class NotAuthorisedError extends Error {

    constructor( message = 'Not Authorised' ) {
        super( message );
    }

    get name() {
        return 'NotAuthorisedError';
    }

}