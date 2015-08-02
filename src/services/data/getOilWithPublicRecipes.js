import { Oil } from 'models/oil';

export default class {

    constructor( options ) {
        this.id = options.oilId;

        this.oil = null;
    }

    execute() {
        return getOil.call( this )
            .bind( this )
            .then( setOil )
            .then( returnOil );
    }
}

//////////////////
////// Private

function getOil() {
    return Oil
        .forge( {
            id: this.id
        } )
        .fetch( {
            withRelated: [ {
                recipes: qb => {
                    qb.where( {
                        visibility: 1
                    } );
                }
            }]
        } );
}

function setOil( oil ) {
    this.oil = oil;
}

function returnOil() {
    return this.oil;
}