import React, {useState} from 'react'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'
import {LandingIntro} from "./components/LandingIntro";
import { useSendLinkOtpMutation } from '../../apps/services/forgetPasswordApi'
import { ISendLinkOtp } from '../../utils/interfaces'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

function ForgotPasswordContainer(){

    // const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [sendLinkOtp, {isLoading}] = useSendLinkOtpMutation();
    const [userObj, setUserObj] = useState<ISendLinkOtp>({
        email: ""
    })

    const submitForm = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setErrorMessage("")

        if(userObj.email.trim() === "")return setErrorMessage("Email is required! (use any value)")
        else{
            sendLinkOtp(userObj).unwrap()
            .then((res) => {
                toast.success(res.message);
                setLinkSent(true);
            })
            .catch((err) => {
                toast.error(err.data.message ?? "Gagal mengirim link reset password");
                setErrorMessage(err.data.message)
            });
            // setLinkSent(true)
        }
    }

    const updateFormValue = ({updateType, value}: any) => {
        setErrorMessage("")
        setUserObj({...userObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Lupa Password</h2>

                    {
                        linkSent &&
                        <>
                            <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
                            <p className='my-4 text-xl font-bold text-center'>Link Terkirim</p>
                            <p className='mt-4 mb-8 font-semibold text-center'>Silahkan periksa email anda untuk reset password</p>
                            {/* <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Login</button></Link></div> */}

                        </>
                    }

                    {
                        !linkSent &&
                        <>
                            <p className='my-8 font-semibold text-center'>Link reset password akan dikirim ke email anda</p>
                            <form onSubmit={(e) => submitForm(e)}>

                                <div className="mb-4">
                                    <InputText type="email" defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
                                </div>
                                <div className='text-right text-primary'>
                                    <Link to="/login"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link>
                                </div>
                                <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                                <button type="submit" className={"btn mt-2 w-full btn-primary"} disabled={isLoading}>
                                    {
                                        isLoading?
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-200"></div> Mengirim reset link
                                        </div>
                                        :
                                        "Kirim Reset Link"
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
    )
}

export default ForgotPasswordContainer
