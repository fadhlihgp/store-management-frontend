import TitleCard from "../../../components/Cards/TitleCard"
import { LoadingProcess } from "../../../components/Loading/LoadingProcess"
import FailedLoad from "../../../components/OtherDisplay/FailedLoad"
import { PaginationComponent } from "../../../components/Pagination"
import { convertCurrency } from "../../../utils/convertCurrency"
import { useGetPurchaseListQuery } from "../../../apps/services/purchaseApi"
import { useEffect, useRef, useState } from "react"
import { IPurchaseListResponse } from "../../../utils/interfaces"
import { MaximumWordLength } from "../../../utils/MaximumWordLength"
import moment from "moment"
import { FilterFormPurchaseList } from "../Components/FilterFormPurchaseList"
import { Link, useNavigate } from "react-router-dom"
import { PurchaseReport } from "../../reports/PurchaseReport"
import { useReactToPrint } from "react-to-print"

export const PurchaseListContainer = () => {
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const [purchaseListFilter, setPurchaseListFilter] = useState<
    IPurchaseListResponse[]
  >([]);
  const [dateFilterValue, setDateFilterValue] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });
  const {
    data: purchaseList,
    isError,
    isSuccess,
    isLoading,
  } = useGetPurchaseListQuery(`?status=paid`);

  useEffect(() => {
    if (isSuccess) {
      setPurchaseListFilter(purchaseList.data);
    }
  }, [purchaseList, isSuccess]);

  useEffect(() => {
    if (purchaseList) {
      const dateString = {
        startDate: moment(dateFilterValue.startDate).format("YYYY-MM-DD"),
        endDate: moment(dateFilterValue.endDate).format("YYYY-MM-DD"),
      };
      setPurchaseListFilter(
        purchaseList.data.filter((item) => {
          const date = moment(item.date).format("YYYY-MM-DD");
          return date >= dateString.startDate && date <= dateString.endDate;
        })
      );
    }
  }, [dateFilterValue, purchaseList]);

  const updateSearchValue = ({value}: any) => {
    if (purchaseList) {
        const dateString = {
            startDate: moment(dateFilterValue.startDate).format("YYYY-MM-DD"),
            endDate: moment(dateFilterValue.endDate).format("YYYY-MM-DD"),
          };
        setPurchaseListFilter(
            purchaseList.data.filter((item) => {
              const date = moment(item.date).format("YYYY-MM-DD");
              return date >= dateString.startDate && date <= dateString.endDate && 
              (item.invoice.toLowerCase().includes(value.toLowerCase()) || item.customer.toLowerCase().includes(value.toLowerCase()));
            })
          );
    }
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  const MainContent = isError ? (
    <FailedLoad />
  ) : (
    <PaginationComponent
      data={purchaseListFilter}
      itemsPerPage={15}
      titleTables={[
        "No",
        "Invoice",
        "Nama Pelanggan",
        "Tipe",
        "Tanggal",
        "Total",
        "Catatan",
        "Aksi",
      ]}
      renderTitle={(title, index) => (
        <th key={index} className="text-center">
          {title}
        </th>
      )}
      renderItem={(item, index) => (
        <tr key={index} className={"text-center"}>
          <td>{index + 1}</td>
          <td>{item.invoice}</td>
          <td>{item.customer}</td>
          <td>{item.purchaseType}</td>
          <td>{moment(item.date).format("DD MMM yyyy")}</td>
          <td>{convertCurrency("Rp", item.purchaseTotal)}</td>
          <td>{MaximumWordLength(item.note ?? "", 20)}</td>
          <td className={"flex items-center justify-center"}>
            <Link to={`/transaction-detail/${item.id}`} className="text-blue-500 font-semibold hover:text-blue-800">Lihat</Link>
          </td>
        </tr>
      )}
    />
  );
  return (
    <>
      {/* <FormComponentDebt dataProducts={}/> */}
      {purchaseListFilter && (
              <div style={{ display: 'none' }}>
                  <div ref={componentRef}>
                  {/* Komponen atau tampilan yang akan dicetak */}
                  <pre>
                      <PurchaseReport startDate={dateFilterValue.startDate} endDate={dateFilterValue.endDate} data={purchaseListFilter} key={"print"} />
                  </pre>
                  </div>
              </div>
      )}

      <TitleCard
        title="Daftar Riwayat Transaksi"
        topSideButtons={
          <FilterFormPurchaseList
            handlePrint={handlePrint}
            updateSearchValue={updateSearchValue}
            handleAdd={() => navigate("/transaction-purchase")}
            dateValue={dateFilterValue}
            setDateValue={setDateFilterValue}
            key={"1"}
          />
        }
        // topSideButtons={<TopSideButtons
        //     onClick={handleAddOrDetail}
        //     onChangeInput={handleFilter}
        //     componentChildren={<FilterForm handleAdd={() => navigate("/note-debt/add")}
        //     updateFormValue={updateFormValue} />}/>}
        // title={"Daftar Hutang"}
      >
        {isLoading ? (
          <LoadingProcess key={1} loadingName="Mengambil data transaksi" />
        ) : (
          MainContent
        )}
      </TitleCard>
    </>
  );
};
