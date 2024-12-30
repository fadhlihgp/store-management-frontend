import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {ConfirmationModal} from "../../components/Modals/ConfirmationModal.tsx";
import TitleCard from "../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../components/Input/TopSideButtons.tsx";
import {EyeIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {useDeleteCustomerMutation, useGetCustomerQuery} from "../../apps/services/customerApi";
import {LoadingProcess} from "../../components/Loading/LoadingProcess";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import {ICustomerResponse} from "../../utils/interfaces";
import {showOrCloseModal} from "../../utils/showModalHelper";
import { PaginationComponent } from "../../components/Pagination.tsx";

export const CustomerContainer = () => {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState<string>("-1");
  const {
    data: customerList,
    isLoading: isGetLoading,
    isError: isGetError,
    isSuccess: isGetSuccess,
  } = useGetCustomerQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [customerFilter, setCustomerFilter] = useState<ICustomerResponse[]>([]);

  useEffect(() => {
    if (isGetSuccess) {
      setCustomerFilter(customerList.data);
    }
  }, [customerList, isGetSuccess]);

  const handleAddOrEdit = (id: string = "-1") => {
    window.scrollTo(0, 0);
    if (id === "-1") {
      navigate("/customer/add");
    } else {
      navigate("/customer/edit/" + id);
    }
  };

  const handleDelete = (id: string) => {
    setCustomerId(id);
    showOrCloseModal("modal-delete", "show");
  };

  const deleteCurrentCustomer = () => {
    console.log(customerId);
    deleteCustomer(customerId)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message ?? "Gagal menghapus data pelanggan");
      });
    showOrCloseModal("modal-delete", "close");
  };

  const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filtered = customerList?.data.filter((c) =>
      c.fullName.toLowerCase().includes(value.toLowerCase())
    );
    if (filtered) {
      setCustomerFilter(filtered);
    }
  };


  const titleTables = ["No", "Nama Lengkap", "Alamat", "Email", "No Hp", "Aksi"];

  const MainContent = isGetError ? (
    <FailedLoad key={"1"} />
  ) : <PaginationComponent 
            data={customerFilter}
            itemsPerPage={15}
            titleTables={titleTables}
            renderTitle={(title, k) => (
              <th key={k} className="text-center">
                  {title}
              </th>
            )}
            renderItem={(u, k) => {
              return (
                <tr key={k} className={"text-center"}>
                  <td>{k + 1}</td>
                  <td>{u.fullName}</td>
                  <td>{u.address ?? "-"}</td>
                  <td>{u.email ?? "-"}</td>
                  <td>{u.phoneNumber ?? "-"}</td>
                  <td className={"flex justify-center"}>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/customer/detail/${u.id}`);
                      }}>
                      <EyeIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleAddOrEdit(u.id)}>
                      <PencilSquareIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDelete(u.id)}>
                      <TrashIcon className="w-5" />
                    </button>
                  </td>
                </tr>
              );
            }}
      />
      
  return (
    <>
      <ConfirmationModal
        onClickYes={deleteCurrentCustomer}
        message={"Anda yakin ingin menghapus data pelanggan ?"}
      />
      <TitleCard
        title="Daftar Pelanggan"
        topMargin="mt-2"
        topSideButtons={
          <TopSideButtons
            onClick={() => handleAddOrEdit()}
            onChangeInput={handleOnSearchChange}
            placeHolder="Cari nama pelanggan"
          />
        }>
        {isGetLoading ? (
          <LoadingProcess loadingName={"Mengambil data pelanggan"} key={"2"} />
        ) : (
          MainContent
        )}
      </TitleCard>
    </>
  );
};
