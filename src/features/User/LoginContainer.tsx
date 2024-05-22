import { useState } from "react";
import InputText from "../../components/Input/InputText";
import {Link} from "react-router-dom";
import {LandingIntro} from "./components/LandingIntro";
import Cookies from "js-cookie";
import ErrorText from "../../components/Typography/ErrorText";
import {useLoginMutation} from "../../apps/services/authApi";

function LoginContainer(){
    const INITIAL_LOGIN_OBJ = {
        password : "",
        email : ""
    }
    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)
    const [login] = useLoginMutation();

    const submitForm = async (e:any) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.email.trim() === "")return setErrorMessage("Email/Username tidak boleh kosong!")
        if(loginObj.password.trim() === "")return setErrorMessage("Password tidak boleh kosong! ")
        else{
            try {
                setLoading(true);
                const user = await login(loginObj).unwrap();
                Cookies.set("token", user.data.token);
                Cookies.set("user", JSON.stringify(user.data.user));
                window.location.href = "/dashboard";
            } catch (e: any) {
                console.log(e);
                setErrorMessage(e.data.message ?? "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        }
    }

    const updateFormValue = ({updateType, value}:any) => {
        setErrorMessage("")
        setLoginObj({...loginObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center w-full h-full p-0">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={submitForm}>

                        <div className="mb-4">

                            <InputText type="text" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email atau Username" updateFormValue={updateFormValue}/>
                            <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                        </div>

                        <div className='text-right text-primary'>
                             <Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Lupa Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary"} disabled={loading}>
                            {loading ?
                                <>
                                    <span className="loading loading-spinner"></span>
                                    loading
                                </> :
                                "Login"
                            }
                            {/*Login*/}
                        </button>

                        {/*<div className='text-center mt-4'>Belum punya akun?*/}
                        {/*  <Link to="/register"><span className=" inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 text-primary"> Request disini</span></Link>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default LoginContainer
