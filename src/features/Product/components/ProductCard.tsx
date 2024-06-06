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
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className={'h-60'}><img src={product.imageUrl ?? "./noimage.jpg"} alt={product.name} /></figure>
            <div className="card-body">
                <h3 className="card-title font-bold">{product.name}</h3>
                <p className={'font-semibold text-lg'}>{convertCurrency("Rp", product.price)}/<span className="text-md">{product.unit}</span> <br></br> <span>Stock: {product.stock}</span> </p>
                <div className="card-actions justify-end flex">
                    <button onClick={onClickDelete} className="btn bg-[#D04848] text-slate-200 hover:bg-[#A94438]">Hapus</button>
                    <button onClick={onClickDetail} className="btn btn-primary">Lihat Detail</button>
                </div>
            </div>
        </div>
    )
}