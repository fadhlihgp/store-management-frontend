import { useNavigate } from "react-router-dom";
import { useDeleteStockOutMutation, useGetStockOutListQuery } from "../../apps/services/productApi";
import { IStockInOutResponse } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import { showOrCloseModal } from "../../utils/showModalHelper";
import toast from "react-hot-toast";
import FailedLoad from "../../components/OtherDisplay/FailedLoad";
import { PaginationComponent } from "../../components/Pagination";
import moment from "moment";
import { MaximumWordLength } from "../../utils/MaximumWordLength";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal } from "../../components/Modals/ConfirmationModal";
import TitleCard from "../../components/Cards/TitleCard";
import { TopSideButtons } from "../../components/Input/TopSideButtons";
import { LoadingProcess } from "../../components/Loading/LoadingProcess";

export const StockOutListContainer = () => {
    const navigate = useNavigate();
    const [stockOutId, setStockOutId] = useState<string>("-1");
    const {
      data: stockOutList,
      isLoading: isGetLoading,
      isError: isGetError,
      isSuccess: isGetSuccess,
    } = useGetStockOutListQuery();
    const [deleteStockOut] = useDeleteStockOutMutation();
    const [stockOutFilter, setStockOutFilter] = useState<IStockInOutResponse[]>([]);
  
    useEffect(() => {
      if (isGetSuccess && stockOutList.data) {
        setStockOutFilter(stockOutList.data);
      }
    }, [stockOutList, isGetSuccess]);
  
    const handleAddOrEdit = (id: string = "-1") => {
      window.scrollTo(0, 0);
      if (id === "-1") {
        navigate("/product/stock-out/add");
      } else {
        navigate("/product/stock-out/edit/" + id);
      }
    };
  
    const handleDelete = (id: string) => {
      setStockOutId(id);
      showOrCloseModal("modal-delete", "show");
    };
  
    const deleteCurrentStockOut = () => {
      deleteStockOut(stockOutId)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
        })
        .catch((err) => {
          toast.error(err.message ?? "Gagal menghapus data stok keluar");
        });
      showOrCloseModal("modal-delete", "close");
    };
  
    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const filtered = stockOutList?.data?.filter((c) =>
        c.product.toLowerCase().includes(value.toLowerCase()));
      if (filtered) {
        setStockOutFilter(filtered);
      }
    };
  
  
    const titleTables = ["No", "Tanggal", "Produk", "Total Item", "Catatan", "Aksi"];
  
    const MainContent = isGetError ? (
      <FailedLoad key={"1"} />
    ) : <PaginationComponent 
              data={stockOutFilter}
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
                    <td>{moment(u.date).format("DD MMM yyyy")}</td>
                    <td>{MaximumWordLength(u.product ?? "-", 20)}</td>
                    <td>{u.totalItem}</td>
                    <td>{MaximumWordLength(u.note ?? "-", 20)}</td>
                    <td className={"flex justify-center"}>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(`/product/stock-out/detail/${u.id}`);
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
          onClickYes={deleteCurrentStockOut}
          message={"Anda yakin ingin menghapus data stok keluar ?"}
        />
        <TitleCard
          title="Daftar Stok Keluar"
          topMargin="mt-2"
          topSideButtons={
            <TopSideButtons
              onClick={() => handleAddOrEdit()}
              onChangeInput={handleOnSearchChange}
              placeHolder="Cari produk"
            />
          }>
          {isGetLoading ? (
            <LoadingProcess loadingName={"Mengambil data stok keluar"} key={"2"} />
          ) : (
            MainContent
          )}
        </TitleCard>
      </>
    );
}