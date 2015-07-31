import Checkit from 'checkit';

export default class {

    constructor( payload ) {
        this.payload = payload;
    }

    execute() {
        let rules = new Checkit( {
            name: [ 'required', 'maxLength:100' ],
            kohPurity: [ 'numeric' ],
            soapType: [ 'required' ],
            superFat: [ 'numeric' ],
            //totalUom: [''],
            //totalWeight: [ 'numeric' ]
            uom: {
                rule: 'contains',
                params: [ 'gram', 'kilo', 'pound', 'percent', 'ounce' ]
            },
            waterRatio: [ 'required', 'numeric' ],
            oils: [ 'required', 'array' ],
            weights: [ 'required', 'object' ],
            summary: [ 'required', 'object' ]
        } );

        return rules.run( this.payload );
    }
}


///////////////////

//function validateSummary() {
//
//}
//
//function validateSummaryTotals() {
//
//}
//
//function validateSummaryBreakdowns() {
//
//}
//
//function validateSummaryProperties() {
//
//}
//
//function validateSaturation() {
//
//}