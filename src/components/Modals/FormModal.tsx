import {ReactNode} from "react";

interface ConfirmationModalProps {
    title?: string,
    id?: string,
    onClickYes: () => void,
    onClickCancel: () => void,
    children: ReactNode
}

export const FormModal = ({id, title = "Form", onClickYes, children, onClickCancel}: ConfirmationModalProps) => {
    return(
        <dialog id={id ?? "modal-form"} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className={'flex gap-2 justify-end'}>
                            <button className={'btn btn-success text-white'} onClick={onClickYes} type={"button"}>Simpan</button>
                            <button className="btn" onClick={onClickCancel}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
