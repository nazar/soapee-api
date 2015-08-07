import Exception from 'exceptions/exception';

export default class InvalidPostData extends Exception {

    constructor( message = 'Invalid POST or PUT data' ) {
        super( message );
    }

    get name() {
        return 'InvalidPostData';
    }

    get status() {
        return 422;
    }

}