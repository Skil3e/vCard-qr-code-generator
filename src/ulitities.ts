export type Inputs = {
    firstName: string
    lastName: string
    phone: string
    email: string
    jobTitle?: string
    companyName?: string
    website?: string
    address?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
}

export function createVCard( info: Inputs ) {
    return `BEGIN:VCARD
VERSION:3.0
N:${ info.lastName };${ info.firstName }
FN:${ info.firstName } ${ info.lastName }
ADR;TYPE=work:;;${ info.address };${ info.city };${ info.state };${ info.postalCode };${ info.country }
TEL;TYPE=work:${ info.phone }
EMAIL;TYPE=work:${ info.email }
URL;TYPE=work:${ info.website }
ORG:${ info.companyName }
TITLE:${ info.jobTitle }
END:VCARD`
}

export function download( filename: string, text?: string ) {
    if (!text) {
        console.log( "No svg was selected" )
        return
    }
    const element = document.createElement( 'a' );
    element.setAttribute( 'href', 'data:image/svg+xml;base64,' + window.btoa( text ) );
    element.setAttribute( 'download', filename );
    element.style.display = 'none';
    document.body.appendChild( element );
    element.click();
    document.body.removeChild( element );
}

export function makeTitle( text: string ) {
    const result = text.replace( /([A-Z])/g, " $1" );
    return result.charAt( 0 ).toUpperCase() + result.slice( 1 );
}
