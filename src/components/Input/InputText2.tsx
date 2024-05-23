interface InputTextProps {
    labelTitle: string,
    labelStyle?: string,
    type?: string,
    containerStyle?: string,
    value: any,
    name: string,
    placeholder?: string,
    handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    updateType?: any,
    isDisabled?: boolean,
    isRequired?: boolean,
}

function InputText2({labelTitle, labelStyle, type, containerStyle, isRequired = false, value , name, placeholder, handleOnChange, isDisabled}: InputTextProps){


    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input
                type={type || "text"}
                value={value}
                placeholder={placeholder || ""}
                onChange={handleOnChange}
                name={name}
                required={isRequired}
                disabled={isDisabled ?? false}
                className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText2
