import _ from 'lodash';

export default function ( model, id, res, next, options = {} ) {
    return model
        .forge( {
            id
        } )
        .fetch( options.fetch )
        .then( data => {
            let result;

            result = data.toJSON();

            if ( options.omitId ) {
                result = _.omit( result, 'id' );
            }

            if ( options.get ) {
                result = _.get( result, options.get );
            }

            res.json( result );
        } )
        .catch( next );
}