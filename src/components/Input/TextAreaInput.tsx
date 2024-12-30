import { useState } from "react"

interface TextAreaInputProps {
    labelTitle: string,
    labelStyle?: string,
    containerStyle?: string,
    defaultValue: string,
    placeholder?: string,
    updateFormValue: (e:any) => void,
    updateType?: any,
    isRequired?: boolean
}

function TextAreaInput({labelTitle, labelStyle, isRequired = false, containerStyle, defaultValue, placeholder, updateFormValue, updateType}:TextAreaInputProps){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val: any) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}  {isRequired ? <span className="text-red-600 text font-bold">*</span> : ""}</span>
            </label>
            <textarea value={value} required={isRequired} className="textarea textarea-bordered w-full" placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)}></textarea>
        </div>
    )
}


export default TextAreaInput
