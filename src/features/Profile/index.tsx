import TitleCard from "../../components/Cards/TitleCard.tsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import InputText2 from "../../components/Input/InputText2";
import React, {useEffect, useState} from "react";
import {LoadingProcess} from "../../components/Loading/LoadingProcess";
import {useGetProfileQuery, useUpdateProfileMutation} from "../../apps/services/profileApi";
interface Profile {
    email: string,
    username: string,
    fullName: string,
    phoneNumber?: string,
}
export const ProfileFormContainer = () => {
    const navigate = useNavigate();
    const { data: dataProfile, isLoading, isSuccess } = useGetProfileQuery();
    const [update, {isLoading: isLoadingUpdate}] = useUpdateProfileMutation();
    const [profileForm, setProfileForm] = useState<Profile>({
        username: "",
        email: "",
        fullName: "",
        // phoneNumber: ""
    });

    useEffect(() => {
        if (isSuccess) {
            const {email, username, fullName, phoneNumber} = dataProfile.data;
            setProfileForm({...profileForm,
                email: email,
                username: username,
                fullName: fullName,
                phoneNumber: phoneNumber ?? ""
            });
        }
    }, [dataProfile]);

    const handleSaveUser = async () => {
        try {
            const dataUpdate = await update(profileForm).unwrap();
            toast.success(dataUpdate.message);
        } catch (err: any) {
            toast.error(err.message ?? "Gagal menyimpan data");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileForm({...profileForm, [event.target.name]: event.target.value})
    }

    return(
        <TitleCard title={"Profile"} topMargin="mt-2">
            {isLoading ?<LoadingProcess loadingName={"Memuat Data"} /> :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText2 name={"fullName"} labelTitle={"Nama Lengkap"} value={profileForm?.fullName} handleOnChange={handleChange}/>
                        <InputText2 name={"email"} labelTitle={"email"} value={profileForm?.email} handleOnChange={handleChange}/>
                        <InputText2 labelTitle="Username" value={profileForm?.username} name={"username"} handleOnChange={handleChange}/>
                        <InputText2 labelTitle="Nomor Ponsel" value={profileForm?.phoneNumber} name={"phoneNumber"} handleOnChange={handleChange}/>
                    </div>
                    <div className="divider" ></div>

                    <div className={'flex gap-2 justify-end'}>
                        <div className="mt-16"><button className="btn float-right" onClick={() => navigate("/dashboard")}>Batal</button></div>
                        <div className="mt-16">
                            <button className="btn btn-primary float-right" disabled={isLoadingUpdate} onClick={handleSaveUser}>
                                {isLoadingUpdate ? <>
                                    <span className="loading loading-spinner"></span>
                                    Memperbarui Data
                                </> :
                                    "Simpan Perubahan"
                                }
                            </button>
                        </div>
                    </div>
                </>
            }
        </TitleCard>
    )
}
