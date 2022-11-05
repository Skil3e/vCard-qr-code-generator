import { forwardRef, HTMLProps, Ref } from "react";
import { FieldErrorsImpl } from "react-hook-form";
import { Inputs } from "../ulitities";

type TInputField = HTMLProps<HTMLInputElement> & {
    wrapperClassName?: string
    optional?: boolean
    label?: string
    errors: Partial<FieldErrorsImpl<Inputs>>
}

export const InputField = forwardRef(
    ( props: TInputField, ref?: Ref<HTMLInputElement> ) => {
        const { label, errors, optional, wrapperClassName, ...rest } = props
        return (
            <div className={ wrapperClassName }>
                <label htmlFor={ props.id ?? props.name }>{ label ?? props.name } { optional && <small>(optional)</small> }</label>
                <input ref={ ref } id={ props.id ?? props.name } { ...rest }/>
                { errors.firstName && <span>This field is required</span> }
            </div>
        )
    } )

