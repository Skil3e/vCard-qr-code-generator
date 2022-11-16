import { useForm, SubmitHandler } from "react-hook-form";
import QRCode from 'qrcode.react';
import { useRef, useState } from "react";
import { download } from "../ulitities";
import { InputField } from "../components/input";


type Inputs = {
    url: string
}

export const UrlGenerator = () => {
    const qr = useRef<HTMLDivElement | null>( null )
    const [ data, setData ] = useState<string>( "" )
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    function downloadQr() {
        if (!qr.current) return
        const svg = qr.current?.firstChild as SVGElement
        svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' )
        qr.current?.replaceChildren( svg );
        download( "qrcode", `${ qr.current?.innerHTML }` )
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        setData( data.url )
    }

    return (
        <div className="container flow" data-flow-space={ 'lg' }>
            <h1 className={ "h5" }>QR Code URL Generator</h1>
            <form onSubmit={ handleSubmit( onSubmit ) } className={ "flow" } data-flow-space={ 'sm' }>
                <InputField
                    id={ "url" }
                    optional={ false }
                    label={ "URL" }
                    { ...register( "url", { required: true } ) }
                    errors={ errors }
                />
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

    )
}

