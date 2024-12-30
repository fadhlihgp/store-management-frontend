import { useNavigate } from "react-router-dom";
import { useDeleteStockInMutation, useGetStockInListQuery } from "../../apps/services/productApi";
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
import { convertCurrency } from "../../utils/convertCurrency";

export const StockInListContainer = () => {
    const navigate = useNavigate();
    const [stockInId, setStockInId] = useState<string>("-1");
    const {
      data: stockInList,
      isLoading: isGetLoading,
      isError: isGetError,
      isSuccess: isGetSuccess,
    } = useGetStockInListQuery();
    const [deleteStockIn] = useDeleteStockInMutation();
    const [stockInFilter, setStockInFilter] = useState<IStockInOutResponse[]>([]);
  
    useEffect(() => {
      if (isGetSuccess && stockInList.data) {
        setStockInFilter(stockInList.data);
      }
    }, [stockInList, isGetSuccess]);
  
    const handleAddOrEdit = (id: string = "-1") => {
      window.scrollTo(0, 0);
      if (id === "-1") {
        navigate("/product/stock-in/add");
      } else {
        navigate("/product/stock-in/edit/" + id);
      }
    };
  
    const handleDelete = (id: string) => {
      setStockInId(id);
      showOrCloseModal("modal-delete", "show");
    };
  
    const deleteCurrentStockIn = () => {
      deleteStockIn(stockInId)
        .unwrap()
        .then((res) => {
          toast.success(res.message);
        })
        .catch((err) => {
          toast.error(err.message ?? "Gagal menghapus data stok masuk");
        });
      showOrCloseModal("modal-delete", "close");
    };
  
    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const filtered = stockInList?.data?.filter((c) =>
        c.product.toLowerCase().includes(value.toLowerCase()) || c.supplier.toLowerCase().includes(value.toLowerCase())
      );
      if (filtered) {
        setStockInFilter(filtered);
      }
    };
  
  
    const titleTables = ["No", "Tanggal", "Produk", "Total Item", "Total Harga",  "Supplier", "Catatan", "Aksi"];
  
    const MainContent = isGetError ? (
      <FailedLoad key={"1"} />
    ) : <PaginationComponent 
              data={stockInFilter}
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
                    <td>{convertCurrency("Rp", u.totalPrice ?? 0)}</td>
                    <td>{MaximumWordLength(u.supplier ?? "-", 20)}</td>
                    <td>{MaximumWordLength(u.note ?? "-", 20)}</td>
                    <td className={"flex justify-center"}>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(`/product/stock-in/detail/${u.id}`);
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
          onClickYes={deleteCurrentStockIn}
          message={"Anda yakin ingin menghapus data stok masuk ?"}
        />
        <TitleCard
          title="Daftar Stok Masuk"
          topMargin="mt-2"
          topSideButtons={
            <TopSideButtons
              onClick={() => handleAddOrEdit()}
              onChangeInput={handleOnSearchChange}
              placeHolder="Cari produk atau supplier"
            />
          }>
          {isGetLoading ? (
            <LoadingProcess loadingName={"Mengambil data stok masuk"} key={"2"} />
          ) : (
            MainContent
          )}
        </TitleCard>
      </>
    );
}