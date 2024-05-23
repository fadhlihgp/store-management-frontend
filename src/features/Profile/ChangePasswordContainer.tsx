import InputText2 from "../../components/Input/InputText2";
import TitleCard from "../../components/Cards/TitleCard";
import React, {useState} from "react";
import {useChangePasswordMutation} from "../../apps/services/profileApi";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

interface ChangePasswordState {
    newPassword: string,
    oldPassword: string,
    confirmPassword: string,
}

interface ErrorValidationInputState {
    errorConfirmPassword: string,
    errorNewPassword: string,
    errorOldPassword: string
}

export const ChangePasswordContainer = () => {
    const navigate = useNavigate();
    const [changePassword, {isLoading}] = useChangePasswordMutation();
    const [changePasswordForm, setChangePaswordForm] = useState<ChangePasswordState>({
        confirmPassword: "",
        newPassword: "",
        oldPassword: ""
    });
    const [errorValidation, setErrorValidation] = useState<ErrorValidationInputState | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setChangePaswordForm({...changePasswordForm, [name]: value});
        setErrorValidation(undefined);
    }

    const validationInput = (): boolean => {
        let valid = true;
        if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
            setErrorValidation({...errorValidation, errorConfirmPassword: "Password baru dan konfirmasi password harus sama"});
            valid = false;
        }
         if ((changePasswordForm.newPassword.length < 7 )) {
             setErrorValidation({...changePasswordForm, errorNewPassword: "Password minimal harus 7 karakter"});
             valid = false;
         }

        return valid;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validationInput()){
            changePassword(changePasswordForm).unwrap()
                .then((res) => {
                    toast.success(res.message);
                    setChangePaswordForm({
                        confirmPassword: "",
                        newPassword: "",
                        oldPassword: ""
                    });
                })
                .catch((err) => {
                    console.error(err);
                    setErrorValidation({...errorValidation, errorOldPassword: err.data.message});
                })
        }

    }

    return(
        <TitleCard title={"Ganti Password"} topMargin="mt-2">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <InputText2 name={"oldPassword"} labelTitle={"Password Lama"} isRequired={true} type={"password"} value={changePasswordForm?.oldPassword} handleOnChange={handleChange}/>
                        {errorValidation?.errorOldPassword && <span className={"text-red-700 text-md"}>{errorValidation.errorOldPassword}</span>}
                    </div>
                    <div>
                        <InputText2 name={"newPassword"} labelTitle={"Password Baru"} isRequired={true} value={changePasswordForm?.newPassword} type={"password"} handleOnChange={handleChange}/>
                        {errorValidation?.errorNewPassword && <span className={"text-red-700 text-md"}>{errorValidation.errorNewPassword}</span>}
                    </div>
                    <div>
                        <InputText2 labelTitle="Konfirmasi Password Baru" isRequired={true} type={"password"} value={changePasswordForm?.confirmPassword} name={"confirmPassword"} handleOnChange={handleChange}/>
                        {errorValidation?.errorConfirmPassword && <span className={"text-red-700 text-md"}>{errorValidation.errorConfirmPassword}</span>}
                    </div>
                </div>
                <div className="divider" ></div>

                <div className={'flex gap-2 justify-end'}>
                    <div className="mt-16"><button className="btn float-right" type={"button"} onClick={() => navigate("/dashboard")}>Batal</button></div>
                    <div className="mt-16">
                        <button className="btn btn-primary float-right" disabled={isLoading} type={"submit"}>
                            {isLoading ? <>
                                    <span className="loading loading-spinner"></span>
                                    Memperbarui Password
                                </> :
                                "Simpan Perubahan"
                            }
                        </button>
                    </div>
                </div>
            </form>
        </TitleCard>
    )
}
