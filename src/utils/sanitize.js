import sanitizeHtml from 'sanitize-html';

export default function( input ) {
    return  sanitizeHtml( input, {
        allowedTags: [ 'b', 'br', 'i', 'p', 'ul', 'li' ]
    } );
}