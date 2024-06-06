import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {EyeIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {FilterForm} from "../Components/FilterForm.tsx";
import { useGetNoteDebtListQuery } from "../../../apps/services/noteDebtApi.ts";
import React, { useEffect, useState } from "react";
import { IDebtResponseList } from "../../../utils/interfaces.ts";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";
import { showOrCloseModal } from "../../../utils/showModalHelper.ts";
import { PaginationComponent } from "../../../components/Pagination.tsx";

export const DebtListContainer = () => {
    const navigate = useNavigate();
    const {data: debtList, isSuccess, isLoading, isError} = useGetNoteDebtListQuery();
    const [debtListFilter, setDebtListFilter] = useState<IDebtResponseList[]>([]);
    const [filter, setFilter] = useState({
        isPaidOffFilter: "none",
        searchFilter: ""
    });


    useEffect(() => {
        if(isSuccess) {
            setDebtListFilter(debtList.data);
        }
    }, [debtList, isSuccess])


  const applyFilters = ( 
        searchFilter: string, isPaidOffFilter: string, data?: IDebtResponseList[] | undefined) => {
        let filteredData = data?.filter(item => item.customerName.toLowerCase().includes(searchFilter.toLowerCase()));
        if (isPaidOffFilter !== "none") {
            const isPaidOff = isPaidOffFilter === "true";
            filteredData = filteredData?.filter(item => item.isPaidOff === isPaidOff);
        }
        return filteredData;
    }
    
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFilter(prevFilter => ({ ...prevFilter, searchFilter: value.toLowerCase() }));
        
        const data = applyFilters( value, filter.isPaidOffFilter, debtList?.data);
        if (data) {
            setDebtListFilter(data);
        }
    }
    
    const updateFormValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, isPaidOffFilter: value }));
    
        const data = applyFilters( filter.searchFilter, value, debtList?.data);
        if(data) {
            setDebtListFilter(data);
        }
    }
    

    const handleAddOrDetail = (id: string = "-1") => {
        const modal = document.getElementById('form-debt');
        if (id === "-1" && modal) {
            // Set CSS property top to 0 to make modal appear from the top
            modal.style.top = "0";
            showOrCloseModal("form-debt", "show");
        } else {
            window.scrollTo(0, 0);
            navigate("/note-debt/detail/"+id);
        }
    }


    const MainContent = isError ? <FailedLoad /> : (
        <PaginationComponent 
            data={debtListFilter}
            itemsPerPage={15}
            titleTables={["No", "Nama Pelanggan", "Keterangan", "Total Hutang", "Aksi"]}
            renderTitle={(title, index) => 
                <th key={index} className="text-center">{title}</th>
            }
            renderItem={(item, index) => (
                <tr key={index} className={'text-center'}>
                    <td>{index + 1}</td>
                    <td>{item.customerName}</td>
                    <td>{item.isPaidOff ?
                        <div className={'badge badge-success lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Sudah Lunas</div> :
                        <div className={'badge badge-error lg:badge-md badge-lg md:text-md text-xs  text-slate-100'}>Belum Lunas</div>
                        }
                    </td>
                    <td>{convertCurrency("Rp", item.debtAmount)}</td>
                    <td className={'flex items-center justify-center'}>
                        <button className="btn btn-square btn-ghost" onClick={() => handleAddOrDetail(item.id)}><EyeIcon className="w-5"/></button>
                    </td>
                </tr>
            )}
        />
    )
    return(
        <>
            {/* <FormComponentDebt dataProducts={}/> */}
            <TitleCard
                topSideButtons={<TopSideButtons 
                    onClick={handleAddOrDetail}
                    onChangeInput={handleFilter} 
                    componentChildren={<FilterForm handleAdd={() => navigate("/note-debt/add")} 
                    updateFormValue={updateFormValue} />}/>}
                title={"Daftar Hutang"}
            >
                {isLoading ? <LoadingProcess key={1} loadingName="Mengambil data hutang" /> : MainContent}
            </TitleCard>
        </>
    )
}
