import {ReactNode} from "react";

interface TopSideButtonsProps {
    onClick: () => void,
    onChangeInput?: () => void,
    placeHolder?: string,
    componentChildren?: ReactNode
}


export const TopSideButtons = ({onClick, onChangeInput, placeHolder, componentChildren}: TopSideButtonsProps) => {

    return(
        <div className="float-right flex gap-2 items-end flex-col md:flex-row">
            <label className="input input-bordered flex input-sm items-center gap-2">
                <input type="text" className="grow" onChange={onChangeInput} placeholder={placeHolder ?? "Search"} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            {componentChildren && (
                componentChildren
            )}

            {!componentChildren && (
                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={onClick}>Tambah Data</button>
            )}
        </div>
    )
}
