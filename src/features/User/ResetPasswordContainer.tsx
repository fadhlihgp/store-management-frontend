import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import InputText from "../../components/Input/InputText"
import ErrorText from "../../components/Typography/ErrorText"
import { InformationModal } from "../../components/Modals/InformationModal"
import { useResetPasswordMutation, useVerifyOtpQuery } from "../../apps/services/forgetPasswordApi"
import toast from "react-hot-toast"
import { showOrCloseModal } from "../../utils/showModalHelper"

export const ResetPasswordContainer = () => {
    const {token} = useParams();

    const INITIAL_USER_OBJ = {
        newPassword: "",
        confirmPassword: "",
        token: token ?? ""
    }

    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ)
    const {data: verifyData, isError: isErrorVerify, isLoading: isLoadingVerify, error} = useVerifyOtpQuery(token ?? "-");
    const [resetPasswordApi, {isLoading: isLoadingResetPassword}] = useResetPasswordMutation();

    useEffect(() => {
        if (isErrorVerify) {
            if (error) {
                setErrorMessage(error.data.message);
            } else {
                setErrorMessage("An error occurred while verifying the OTP.");
            }
            showOrCloseModal("information-modal", "show");
        }
    }, [error, isErrorVerify, verifyData]);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setErrorMessage("")

        if(userObj.newPassword.trim() === "" || userObj.confirmPassword.trim() === "")return setErrorMessage("Input tidak boleh kosong!");
        if (userObj.newPassword.trim().length < 8) return setErrorMessage("Password minimal 8 karakter!");
        if(userObj.newPassword !== userObj.confirmPassword)return setErrorMessage("Password baru dan konfirmasi password harus sama!");
        else{
            resetPasswordApi(userObj).unwrap()
            .then((res) => {
                toast.success(res.message);
                setLinkSent(true)
            })
            .catch((err) => {
                setErrorMessage(err.data.message);
            })
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setErrorMessage("")
        setUserObj({...userObj, [updateType] : value})
    }

    return(
        <>
            <InformationModal
                id="information-modal"
                type="error"
                key={0}
                message={errorMessage}
                handleOnClick={() => {
                    window.location.href = "/login";
                    showOrCloseModal("information-modal", "close");
                }}
            />
            {!isLoadingVerify && (
                <div className="min-h-screen bg-base-200 flex items-center">
                    <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                        <div className=''>
                        <div className="hero min-h-full rounded-l-xl bg-base-200">
                        <div className="hero-content py-12">
                            <div className="max-w-md">

                                <h1 className='text-3xl text-center font-bold '><img src="/roundstore.png" className="w-16 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />KelolaWarung</h1>

                                <div className="text-center mt-12"><img src="/intro.png" alt="Auth Logo" className="w-48 inline-block"></img></div>

                                {/* Importing pointers component */}

                            </div>

                        </div>
                </div>
                        </div>
                        <div className='py-24 px-10'>
                            <h2 className='text-2xl font-semibold mb-2 text-center'>Reset Password</h2>

                            {
                                linkSent &&
                                <>
                                    <div className='text-center mt-8'>
                                        {/* <ExclamationCircleIcon className='inline-block w-32 text-warning'/> */}
                                        <CheckCircleIcon className='inline-block w-32 text-success'/>
                                    </div>
                                    <p className='my-4 text-xl font-bold text-center'>Password berhasil diperbarui</p>
                                    <p className='mt-4 mb-8 font-semibold text-center'>Silahkan login dan gunakan password yang baru</p>
                                    <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Login</button></Link></div>

                                </>
                            }

                            {
                                !linkSent &&
                                <>
                                    <p className='my-8 font-semibold text-center'>Silahkan masukkan password baru minimal berisi 8 karakter</p>
                                    <form onSubmit={(e) => submitForm(e)}>

                                        <div className="mb-4">
                                            <InputText type="password" defaultValue={userObj.newPassword} updateType="newPassword" containerStyle="mt-4" labelTitle="Password baru" updateFormValue={updateFormValue}/>
                                        </div>

                                        <div className="mb-4">
                                            <InputText type="password" defaultValue={userObj.confirmPassword} updateType="confirmPassword" containerStyle="mt-4" labelTitle="Konfirmasi password baru" updateFormValue={updateFormValue}/>
                                        </div>

                                        <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                                        <button type="submit" className={"btn mt-2 w-full btn-primary"} disabled={isLoadingResetPassword}>
                                        {
                                            isLoadingResetPassword?
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div> Merubah password
                                            </div>
                                            :
                                            "Simpan"
                                        }
                                    </button>

                                        {/* <div className='text-center mt-4'>Belum punya akun ? <Link to="/register"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</button></Link></div> */}
                                    </form>
                                </>
                            }

                        </div>
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}