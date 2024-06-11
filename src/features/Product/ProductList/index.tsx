import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {ConfirmationModal} from "../../../components/Modals/ConfirmationModal.tsx";
import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";
import {ProductCard} from "../components/ProductCard.tsx";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../apps/services/productApi.ts";
import { IProductListResponse } from "../../../utils/interfaces.ts";
import FailedLoad from "../../../components/OtherDisplay/FailedLoad.tsx";
import { LoadingProcess } from "../../../components/Loading/LoadingProcess.tsx";


export const ProductContainer = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState<string>("-1");
  const [productList, setProductList] = useState<
    IProductListResponse[] | undefined
  >([]);
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const totalPages = Math.ceil((productList?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (isSuccess) {
      setProductList(products.data);
      console.log(products);
    }
  }, [isSuccess, products]);

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filters = products?.data.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setProductList(filters);
  };

  const handleAddOrEdit = (id: string = "-1") => {
    window.scrollTo(0, 0);
    if (id === "-1") {
      navigate("/product/add");
    } else {
      navigate("/product/edit/" + id);
    }
  };

  const handleDelete = (id: string) => {
    setProductId(id);
    showOrCloseModal("show");
  };

  const deleteCurrentProduct = () => {
    deleteProduct(productId)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
      })
      .catch((res) => {
        toast.error(res.message ?? "Gagal menghapus data produk");
      });
    showOrCloseModal("close");
  };

  const showOrCloseModal = (type: string) => {
    const modal = document.getElementById("modal-delete");
    if (modal) {
      if (type === "show") {
        (modal as HTMLDialogElement).showModal();
      } else if (type === "close") {
        (modal as HTMLDialogElement).close();
      }
    }
  };

  const MainContent = isError ? (
    <FailedLoad />
  ) : !currentItems || (currentItems && currentItems?.length < 1) ? (
    <p className="text-lg text-slate-700 text-center font-semibold">
      Data Tidak Ditemukan
    </p>
  ) : (
    <div className={"grid grid-cols-1 md:grid-cols-3 gap-5"}>
      {currentItems.map((data, index) => (
        <ProductCard
          product={data}
          key={index}
          onClickDetail={() => {
            window.scrollTo(0, 0);
            navigate("/product/detail/" + data.id);
          }}
          onClickDelete={() => handleDelete(data.id)}
        />
      ))}
    </div>
  );

  return (
    <>
      <ConfirmationModal
        onClickYes={deleteCurrentProduct}
        message={"Anda yakin ingin menghapus data produk ?"}
      />
      <TitleCard
        title="Produk"
        topMargin="mt-2"
        topSideButtons={
          <TopSideButtons
            onChangeInput={handleOnChangeSearch}
            onClick={() => handleAddOrEdit()}
          />
        }>
        {isLoading ? (
          <LoadingProcess loadingName="Mengambil data produk" key={"1"} />
        ) : (
          MainContent
        )}
        {currentItems && currentItems.length > 0 && (
          <div className="flex mt-4 float-end">
            <div className="flex flex-col gap-2">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}>
                  «
                </button>
                <button className="join-item btn">Halaman {currentPage}</button>
                <button
                  className="join-item btn"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}>
                  »
                </button>
              </div>
              <p>Total Data: {productList?.length ?? 0}</p>
            </div>
          </div>
        )}
        {/* Leads List in table format loaded from slice after api call */}
      </TitleCard>
    </>
  );
};
