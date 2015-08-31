import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import { Verification } from 'models/verification';

import InvalidPostData from 'exceptions/invalidPostData';
import config from 'config';

export default class {

    constructor( payload ) {
        this.token = payload.token;
        this.code = payload.code;
        this.password = payload.password;

        this.user = null;
        this.verification = null;
        this.hash = null;
    }

    execute() {
        return getUserFromDatabase.call( this )
            .bind( this )
            .then( generateNewPassword )
            .then( saveNewPassword )
            .then( sendConfirmationEmail )
            .then( returnUser );
    }
}

////////////////////
///// private

function getUserFromDatabase() {
    return Verification
        .forge( {
            reset_hash: this.token,
            reset_code: this.code
        } )
        .fetch( {
            withRelated: 'user'
        } )
        .then( setLocals.bind( this ) );

    function setLocals( v ) {
        if ( !(v) ) {
            throw new InvalidPostData( 'Invalid Reset Code' );
        }

        this.verification = v;
        this.user = v.related( 'user' );
    }
}

function generateNewPassword() {

    if ( !( this.password ) ) {
        throw new InvalidPostData( 'The password is required' );
    }

    return generateSalt.call( this )
        .then( generateHash.bind( this ) )
        .then( hash => this.hash = hash );


    function generateSalt() {
        return Promise.promisify( bcrypt.genSalt )( 10 );
    }

    function generateHash( salt ) {
        return Promise.promisify( bcrypt.hash )( this.password, salt );
    }

}

function saveNewPassword() {
    this.verification
        .save( {
            hash: this.hash,
            reset_hash: null,
            reset_code: null
        }, { patch: true } );
}

function sendConfirmationEmail() {
    let sendMail;
    let transporter;

    transporter = nodemailer.createTransport( smtpTransport( {
        host: config.smtp.host,
        port: config.smtp.port,
        debug: config.smtp.debug,
        secure: false,
        ignoreTLS: true
    } ) );

    sendMail = Promise.promisify( transporter.sendMail, transporter );

    return sendMail( {
        from: 'noreply@soapee.com',
        to: this.user.get( 'email' ),
        subject: 'SOAPEE.COM - New Password Details',
        text: text.call( this )
    } );

    function text() {
        return (
`The password reset was successful.

Please keep this email safe as it contains your new password.

Your login details are:

  username: ${this.verification.get( 'provider_id' )}
  password: ${this.password}
`
        );
    }
}

function returnUser() {
    return this.user;
}