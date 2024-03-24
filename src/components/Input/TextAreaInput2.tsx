

interface TextAreaInput2Props {
    labelTitle: string,
    labelStyle?: string,
    containerStyle?: string,
    value: string | undefined,
    name: string,
    placeholder?: string,
    handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    textAreaStyle?: string
}

function TextAreaInput2({labelTitle, labelStyle, containerStyle, value , textAreaStyle, name, placeholder, handleOnChange}:TextAreaInput2Props){
    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <textarea
                value={value}
                className={`textarea textarea-bordered w-full ${textAreaStyle}`}
                placeholder={placeholder || ""}
                onChange={handleOnChange}
                name={name}
            >

            </textarea>
        </div>
    )
}


export default TextAreaInput2
