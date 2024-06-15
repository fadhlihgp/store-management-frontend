import {ReactNode} from "react";

interface ConfirmationModalProps {
    title?: string,
    id?: string,
    onClickYes: () => void,
    onClickCancel: () => void,
    children: ReactNode,
    isLoading?: boolean,
}

export const FormModal = ({id, title = "Form", onClickYes, children, onClickCancel, isLoading = false}: ConfirmationModalProps) => {
    return(
        <dialog id={id ?? "modal-form"} className="modal modal-bottom sm:modal-middle w-full">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">{title}</h3>
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className={'flex gap-2 justify-end'}>
                            <button 
                                className={'btn btn-success text-white'} 
                                disabled={isLoading} 
                                onClick={onClickYes} 
                                type={"button"}>
                                    {isLoading ? <>
                                        <span className="loading loading-spinner"></span> proses pembayaran
                                    </> : 'Simpan'}
                            </button>
                            <button className="btn" onClick={onClickCancel}>Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
