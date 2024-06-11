interface InformationModalProps {
    type: "success" | "error" | "warning",
    message?: string,
    id?: string,
    handleOnClick: () => void
}

export const InformationModal = ({id, type, message = "Informasi dialog", handleOnClick}: InformationModalProps) => {
    
    const imageLink: string = type === "success"? "/successicon.png" : type === "error"? "/erroricon.png" : "/warningicon.png";
    return(
        <dialog id={id ?? "information-modal"} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* <h3 className="font-bold text-lg">{title}</h3> */}
                <div className="flex items-center justify-center">
                    <img src={imageLink} alt="icon" className="w-28 h-28" />
                </div>
                <p className="py-2 mt-1 text-center font-semibold">{message}</p>
                <div className="modal-action flex justify-center">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className={''}>
                            <button className={'btn btn-wide'} onClick={handleOnClick} type={"button"}>Oke</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
