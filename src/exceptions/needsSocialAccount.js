import Exception from 'exceptions/exception';

export default class NeedsSocialAccount extends Exception {

    constructor( message = 'This action requires a social account' ) {
        super( message );
    }

    get name() {
        return 'NeedsSocialAccount';
    }

    get status() {
        return 403;
    }

}