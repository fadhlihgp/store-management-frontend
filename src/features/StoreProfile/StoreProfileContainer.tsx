import TitleCard from "../../components/Cards/TitleCard.tsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import {LoadingProcess} from "../../components/Loading/LoadingProcess";
import { useEditCurrentStoreMutation, useGetCurrentStoreQuery } from "../../apps/services/storeApi.ts";
import { IStoreRequest } from "../../utils/interfaces.ts";
import InputText from "../../components/Input/InputText.tsx";
import { DatePickerCustom } from "../../components/Input/DatePickerCustom.tsx";
import { formatStringToDate } from "../../utils/formDateString.ts";
import moment from "moment";
import TextAreaInput from "../../components/Input/TextAreaInput.tsx";
export const StoreProfileContainer = () => {
    const navigate = useNavigate();
    const { data: dataProfile, isLoading, isSuccess } = useGetCurrentStoreQuery();
    const [update, {isLoading: isLoadingUpdate}] = useEditCurrentStoreMutation();
    const [profileForm, setProfileForm] = useState<IStoreRequest>({
        name: "",
        address: "",
        phoneNumber: "",
        businessType: "",
        establishDate: new Date()
        // phoneNumber: ""
    });
    const [showDate, setShowDate] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess && dataProfile.data) {
            setProfileForm(dataProfile.data)
        }
    }, [dataProfile, isSuccess]);

    const handleSaveUser = async ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(profileForm)
        try {
            const dataUpdate = await update(profileForm).unwrap();
            toast.success(dataUpdate.message);
        } catch (err: any) {
            toast.error(err.message ?? "Gagal menyimpan data");
        }
    }

    const handleChange = ({updateType, value}: any) => {
        setProfileForm({...profileForm, [updateType]: value})
    }

    const handleChangeDate = (selectedDate: Date) => {
        setProfileForm(profileForm => ({...profileForm, establishDate: formatStringToDate(moment(selectedDate).format("YYYY-MM-DD"))}));
	}

    return(
        <TitleCard title={"Profile Toko"} topMargin="mt-2">
            {isLoading ?<LoadingProcess loadingName={"Memuat Data"} /> :
                <form onSubmit={handleSaveUser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <InputText type="text" updateType={"name"} labelTitle={"Nama Toko"} isRequired={true}  defaultValue={dataProfile?.data?.name} updateFormValue={handleChange}/>
                        <InputText type="text" updateType={"businessType"} labelTitle={"Tipe Usaha"} isRequired={true} defaultValue={dataProfile?.data?.businessType} updateFormValue={handleChange}/>
                        <InputText type="text" updateType={"phoneNumber"} labelTitle={"Nomor Ponsel"} isRequired={true} defaultValue={dataProfile?.data?.phoneNumber} updateFormValue={handleChange}/>
                        <DatePickerCustom
                            label="Tanggal Berdiri Usaha"
                            show={showDate}
                            setShow={setShowDate}
                            isRequired={true}
                            onChange={handleChangeDate}
                            value={new Date(profileForm.establishDate)}
                        />
                        <TextAreaInput
                            defaultValue={dataProfile?.data?.address ?? ""}
                            labelTitle="Alamat"
                            updateFormValue={handleChange}
                            updateType={"address"}
                            isRequired={true}
                        />
                    </div>
                    <div className="divider" ></div>

                    <div className={'flex gap-2 justify-end'}>
                        <div className="mt-16"><button type="button" className="btn float-right" onClick={() => navigate("/dashboard")}>Batal</button></div>
                        <div className="mt-16">
                            <button className="btn btn-primary float-right" disabled={isLoadingUpdate} >
                                {isLoadingUpdate ? <>
                                    <span className="loading loading-spinner"></span>
                                    Memperbarui Data
                                </> :
                                    "Simpan Perubahan"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            }
        </TitleCard>
    )
}
