import { useNavigate } from "react-router-dom"
import { useDeleteSupplierMutation, useGetSuppliersQuery } from "../../apps/services/supplierApi";
import { useEffect, useState } from "react";
import { ISupplierResponse } from "../../utils/interfaces";
import { showOrCloseModal } from "../../utils/showModalHelper";
import toast from "react-hot-toast";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { PaginationComponent } from "../../components/Pagination";
import { ConfirmationModal } from "../../components/Modals/ConfirmationModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import TitleCard from "../../components/Cards/TitleCard";
import { TopSideButtons } from "../../components/Input/TopSideButtons";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";

export const SupplierContainer = () => {
    const navigate = useNavigate();
    const {data: suppliers, isLoading, isError, isSuccess} = useGetSuppliersQuery();
    const [supplierList, setSupplierList] = useState<ISupplierResponse[] | undefined>([]);
    const [supplierId, setSupplierId] = useState("-1");
    const [deleteSupplier] = useDeleteSupplierMutation();

    useEffect(() => {
        if (isSuccess) {
            setSupplierList(suppliers.data);
        }
    }, [isError, isSuccess, suppliers])

    const handleAddOrEdit = (id:string = "-1") => {
        window.scrollTo(0, 0);
        if (id === "-1"){
            navigate("/supplier/add")
        } else {
            navigate("/supplier/edit/"+ id)
        }
    }

    const handleDelete = (id: string) => {
        setSupplierId(id);
        showOrCloseModal("modal-delete", "show");
    }

    const deleteCurrentSupplier = () => {
        deleteSupplier(supplierId).unwrap()
            .then((res) => {
                toast.success(res.message);
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
            .finally(() => {
                showOrCloseModal("modal-delete", "close");
            })
    }

    const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        if (suppliers?.data){
            const accs = suppliers?.data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.address.toLowerCase().includes(value.toLowerCase()));
            setSupplierList(accs);
        }
    }

    const MainContent = isError ? (<FailedLoad />)
        : (
            supplierList && (
                <PaginationComponent 
                    data={supplierList}
                    itemsPerPage={15}
                    titleTables={["No", "Nama", "Alamat", "No Telepon", "Aksi"]}
                    renderTitle={(item, index) => (
                        <th className="text-center" key={index}>
                            {item}
                        </th>
                    )}
                    renderItem={(item, index) => (
                        <tr key={index} className={'text-center'}>
                            <td>{index + 1}</td>
                             <td>
                                 {item.name}
                             </td>
                             <td>{item.address}</td>
                             <td>{item.phoneNumber}</td>
                             <td className={'flex justify-center'}>
                                 <button className="btn btn-square btn-ghost" onClick={() => handleAddOrEdit(item.id)}><PencilSquareIcon className="w-5"/></button>
                                 <button className="btn btn-square btn-ghost" onClick={() => handleDelete(item.id)}><TrashIcon className="w-5"/></button>
                             </td>
                         </tr>
                    )}
                />
            )
        )

    return(
        <>
            <ConfirmationModal onClickYes={deleteCurrentSupplier} message="Apakah anda yakin ingin menghapus data supplier ?"/>
            <TitleCard
                title="Data Supplier"
                topMargin="mt-2"
                topSideButtons={
                <TopSideButtons 
                    onClick={() => handleAddOrEdit()}  
                    onChangeInput={handleOnChangeSearch} 
                    placeHolder="Cari nama, alamat supplier" 
                />}>
                {isLoading ? <LoadingProcess loadingName={"Memuat data supplier"} /> : MainContent }
                {/* Leads List in table format loaded from slice after api call */}

            </TitleCard>
        </>
    )
}