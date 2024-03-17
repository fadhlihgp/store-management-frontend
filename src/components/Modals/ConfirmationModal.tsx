interface ConfirmationModalProps {
    title?: string,
    message?: string,
    onClickYes: () => void
}

export const ConfirmationModal = ({message = "Anda yakin ingin menghapus user ?", title = "Konfirmasi", onClickYes}: ConfirmationModalProps) => {
    return(
        <dialog id="modal-delete" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className={'flex gap-2 justify-end'}>
                            <button className={'btn btn-error text-white'} onClick={onClickYes} type={"button"}>Yakin</button>
                            <button className="btn">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
