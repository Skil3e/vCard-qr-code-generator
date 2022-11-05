import { useForm, SubmitHandler } from "react-hook-form";
import QRCode from 'qrcode.react';
import { useRef, useState } from "react";
import { createVCard, download, Inputs, makeTitle } from "./ulitities";
import { InputField } from "./components/input";

const defaultValues = {
    firstName  : "Jon",
    lastName   : "Doe",
    phone      : "1234567890",
    email      : "jondoe@example.com",
    jobTitle   : "",
    companyName: "",
    address    : "",
    city       : "",
    state      : "",
    postalCode : "",
    country    : "",
    website    : "",
}


function App() {
    const qr = useRef<HTMLDivElement | null>( null )
    const [ data, setData ] = useState<string>( "" )
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>( {
        defaultValues
    } );

    function downloadQr() {
        if (!qr.current) return
        const svg = qr.current?.firstChild as SVGElement
        svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' )
        qr.current?.replaceChildren( svg );
        download( "qrcode", `${ qr.current?.innerHTML }` )
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        const vCard = createVCard( data )
        setData( vCard )
    }

    return (
        <div>
            <main>
                <div className="container box flow" data-flow-space={ 'lg' }>
                    <h1 className={ "h5" }>vCard QR Code Generator</h1>
                    <form onSubmit={ handleSubmit( onSubmit ) } className={ "flow" } data-flow-space={ 'sm' }>
                        <div className={ "grid" }>
                            { (Object.entries( inputsOptions ) as [ [ key: keyof Inputs, options: typeof inputsOptions['firstName'] ] ]).map( ( [ field, options ] ) =>
                                <InputField
                                    key={ field }
                                    id={ field }
                                    optional={ !options.required }
                                    label={ makeTitle( field ) }
                                    wrapperClassName={ options.span ? "grid-column-span" : undefined }
                                    { ...register( field, { required: options.required } ) }
                                    errors={ errors }
                                />
                            ) }
                        </div>
                        <button type="submit">Generate</button>
                        { " " }
                        <button onClick={ downloadQr } type="button">Download SVG</button>
                    </form>
                    <div ref={ qr }>
                        <QRCode
                            value={ data }
                            size={ 256 }
                            renderAs={ 'svg' }
                            level={ 'H' }
                            includeMargin
                            // imageSettings={{
                            //     src:"",
                            //     height: 50,
                            //     width: 50,
                            //     excavate: true
                            // }}
                        />
                    </div>
                </div>
            </main>
            <footer>Made by: <a href="https://manosm.com" target={ '_blank' } rel={ 'noopener noreferrer' }>Manos</a></footer>
        </div>
    )
}

export default App

const inputsOptions = {
    firstName  : {
        required: true,
        span    : false
    },
    lastName   : {
        required: true,
        span    : false
    },
    phone      : {
        required: true,
        span    : true
    },
    email      : {
        required: true,
        span    : true
    },
    jobTitle   : {
        required: false,
        span    : false
    },
    companyName: {
        required: false,
        span    : false
    },
    website    : {
        required: false,
        span    : true
    },
    address    : {
        required: false,
        span    : false
    },
    city       : {
        required: false,
        span    : false
    },
    state      : {
        required: false,
        span    : true
    },
    postalCode : {
        required: false,
        span    : false
    },
    country    : {
        required: false,
        span    : false
    },

}
