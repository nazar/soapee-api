import Exception from 'exceptions/exception';

export default class InvalidPostData extends Exception {

    constructor( message = 'Invalid POST or PUT data' ) {
        super( message );
    }

    get status() {
        return 422;
    }

}