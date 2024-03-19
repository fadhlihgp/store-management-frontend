import TitleCard from "../../../components/Cards/TitleCard.tsx";
import {IProductPrice} from "../../../utils/TableDataType.ts";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {TopSideButtons} from "../../../components/Input/TopSideButtons.tsx";

interface ListPriceProps {
    productPrices?: IProductPrice[],
    showEdited?: boolean,
    handleAddOrEdit?:() => void,
    handleDelete?: () => void
}

export const ListPrice = ({productPrices, showEdited = false, handleAddOrEdit, handleDelete}: ListPriceProps) => {
    return(
        <TitleCard
            title="List Harga Produk"
            topMargin="mt-2"
            topSideButtons={(showEdited && handleAddOrEdit) && (
                <TopSideButtons onClick={handleAddOrEdit}  />
            )}
        >

            {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr className={'text-center'}>
                        <th>No</th>
                        <th>Harga</th>
                        <th>Satuan</th>
                        <th>Jumlah Per Pcs</th>
                        <th>Tipe</th>
                        {showEdited && (
                            <th>Aksi</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        productPrices?.map((u, k) => {
                            return(
                                <tr key={k} className={'text-center'}>
                                    <td>{k + 1}</td>
                                    <td>
                                        {convertCurrency("Rp", u.price)}
                                    </td>
                                    <td>{u.unit}</td>
                                    <td>{u.qtyPcs}</td>
                                    <td>{u.type}</td>
                                    {showEdited && (
                                        <td className={'flex items-center justify-center'}>
                                            <button className="btn btn-square btn-ghost" onClick={handleAddOrEdit}><PencilSquareIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={handleDelete}><TrashIcon className="w-5"/></button>
                                        </td>
                                    )}
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}