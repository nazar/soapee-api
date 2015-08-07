export default class Exception extends Error {

    constructor( message ) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
    }

}