import { MaximumWordLength } from "../../../utils/MaximumWordLength.ts";
import {convertCurrency} from "../../../utils/convertCurrency.ts";
import { IProductListResponse } from "../../../utils/interfaces.ts";

interface ProductCardProps {
    // name: string,
    // price: number,
    // imageUrl?: string,
    // unit: string,
    product: IProductListResponse,
    onClickDetail: () => void,
    onClickDelete: () => void
}

export const ProductCard = ({product,  onClickDelete, onClickDetail}: ProductCardProps) => {
    return(
        <div className="card card-compact bg-base-100 shadow-xl border-2 border-slate-200 py-3">
            <figure className={'h-20'}><img className="w-36 h-20" width={20} src={product.imageUrl ?? "./noimage.jpg"} alt={product.name} /></figure>
            <div className="card-body flex flex-col justify-between">
                <span>
                    <span className="font-semibold">{MaximumWordLength(product.name, 35)}</span> <br/>
                    <span className={'font-bold'}>{convertCurrency("Rp", product.price)}/{product.unit}</span> <br/>
                    <span>Stock: {product.stock}</span>
                </span>
                <div className="flex gap-2 flex-col md:flex-row lg:flex-row items-center justify-center">
                    <button onClick={onClickDelete} className="btn btn-sm bg-[#D04848] text-slate-200 hover:bg-[#A94438]">Hapus</button>
                    <button onClick={onClickDetail} className="btn btn-sm btn-primary">Detail</button>
                </div>
            </div>
        </div>
    )
}