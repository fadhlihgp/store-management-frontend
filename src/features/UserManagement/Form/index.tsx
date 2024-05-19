import TitleCard from "../../../components/Cards/TitleCard.tsx";
import InputText from "../../../components/Input/InputText.tsx";
import ToogleInput from "../../../components/Input/ToogleInput.tsx";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import SelectBox from "../../../components/Input/SelectBox.tsx";
import {useGetStoreListQuery} from "../../../apps/services/storeApi";
import {useEffect, useState} from "react";
import {IAccountRequest} from "../../../utils/interfaces";
import {useAddAccountMutation, useEditAccountMutation, useGetAccountByIdQuery} from "../../../apps/services/accountApi";
import {LoadingProcess} from "../../../components/Loading/LoadingProcess";
import Cookies from "js-cookie";

const breadcrumbsData = [
    {
        name: "User Management",
        url: "/user-management"
    },
    {
        name: "Form",
        url: "/"
    }
]

const roleSuperAdmin = [
    {
        id: "1",
        name: "Super Admin",
    },
    {
        id: "2",
        name: "Owner"
    },
    {
        id: "3",
        name: "Admin"
    }
]

const roles = [
    {
        id: "2",
        name: "Owner"
    },
    {
        id: "3",
        name: "Admin"
    }
]

export const UserManagementFormContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: storeList} = useGetStoreListQuery();
    const { data: accountDetail, isLoading: isLoadingGetAccount, isSuccess: isSuccessGetAccount } = useGetAccountByIdQuery(id ?? "");
    const [addAccount, {isLoading: isLoadingAddAccount}] = useAddAccountMutation();
    const [editAccount, {isLoading: isLoadingEditAccount}] = useEditAccountMutation();
    const [errorPassword, setErrorPassword] = useState<string | undefined>();

    const textButton = id ? "Update" : "Simpan";

    const [accountForm, setAccountForm] = useState<IAccountRequest>({
        fullName: "",
        roleId: "",
        isActive: true,
        email: "",
        username: ""
    });

    const user = JSON.parse(Cookies.get("user") ?? "");

    useEffect(() => {
        if (isSuccessGetAccount && id) {
            const { email, fullName, username, isActive, phoneNumber, storeId, roleId  } = accountDetail.data
            setAccountForm({...accountForm,
                fullName: fullName,
                email: email,
                username: username,
                isActive: isActive,
                phoneNumber: phoneNumber,
                storeId: storeId,
                roleId: roleId
            })
        }
        console.log(accountDetail)
    }, [accountDetail])

    const handleSaveUser = async (e: any) => {
        e.preventDefault();
        if (accountForm.password && accountForm.password?.length > 0 && accountForm.password.length < 8) {
            setErrorPassword("Password harus berisi minimal 8 karakter");
            return;
        }

        if (!id) {
            await addAccount(accountForm).unwrap()
                .then((res) => {
                    window.scrollTo(0,0);
                    navigate("/user-management");
                    toast.success(res.message)
                })
                .catch((err: any) => {
                    toast.error(err.message ?? "Gagal menyimpan data")
                })
        } else {
            const edit = {
                id: id,
                dataInput: accountForm
            }
            await editAccount(edit).unwrap()
                .then((res) => {
                    toast.success(res.message);
                    window.scrollTo(0,0);
                    navigate("/user-management");
                })
                .catch((err: any) => {
                    toast.error(err.message ?? "Gagal menyimpan data")
                })
        }
        console.log(accountForm);
    }

    const updateFormValue = ({updateType, value}: any) => {
        setAccountForm({...accountForm,[updateType]: value});
    }

    return(
        <TitleCard title={id ? "Edit User" : "Tambah User"} topMargin="mt-2" breadcrumbsData={breadcrumbsData}>
            {isLoadingGetAccount ? <LoadingProcess loadingName={"Mengambil data"} key={"1"}/> : (

                <form onSubmit={handleSaveUser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText isRequired={true} labelTitle="Nama Lengkap" defaultValue={accountDetail?.data.fullName} updateFormValue={updateFormValue} updateType={"fullName"}/>
                        <InputText isRequired={true} labelTitle="Username" defaultValue={accountDetail?.data.username} updateFormValue={updateFormValue} updateType={"username"}/>
                        <InputText isRequired={true} labelTitle="Email" defaultValue={accountDetail?.data.email} updateFormValue={updateFormValue} updateType={"email"}/>
                        <InputText labelTitle="No Telephone" defaultValue={accountDetail?.data.phoneNumber} updateFormValue={updateFormValue} updateType={"phoneNumber"}/>
                        <SelectBox isDisabled={user.roleId !== "1"} updateFormValue={updateFormValue} defaultValue={accountDetail?.data.storeId} labelTitle={"Toko"} options={storeList?.data} placeholder={"Pilih Toko"} updateType={"storeId"}  />
                        <SelectBox updateFormValue={updateFormValue} defaultValue={accountDetail?.data.roleId} labelTitle={"Role"} options={user.roleId === "1" ? roleSuperAdmin : roles} placeholder={"Pilih Role"} updateType={"roleId"}  />
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <InputText labelTitle="Password" type={"password"} defaultValue="" updateFormValue={updateFormValue} updateType={"password"}/>
                            {errorPassword && (
                                <span className={'ml-1 text-md text-red-600'}>{errorPassword}</span>
                            )}
                        </div>
                        {/*<InputText2 labelTitle={"Password"}  value={"ds"} type={"password"} name={"password"} handleOnChange={() => console.log()} />*/}
                        <ToogleInput updateType={"isActive"} labelTitle="Status Aktif" defaultValue={accountDetail?.data.isActive ?? true} updateFormValue={updateFormValue}/>
                    </div>

                    <div className={'flex gap-2 justify-end'}>
                        <div className="mt-16"><button className="btn float-right" onClick={() => navigate("/user-management")}>Batal</button></div>
                        <div className="mt-16">
                            <button className="btn btn-primary float-right" type={"submit"} disabled={isLoadingAddAccount || isLoadingEditAccount} onClick={handleSaveUser}>
                                {isLoadingEditAccount || isLoadingAddAccount ?
                                    <>
                                        <span className="loading loading-spinner"></span> Menyimpan data
                                    </> :
                                    textButton
                                }
                            </button>
                        </div>
                    </div>
                </form>
            )}

        </TitleCard>
    )
}
