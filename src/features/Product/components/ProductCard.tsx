import {convertCurrency} from "../../../utils/convertCurrency.ts";

interface ProductCardProps {
    name: string,
    price: number,
    imageUrl?: string,
    onClickDetail: () => void,
    onClickDelete: () => void
}

export const ProductCard = ({name, price, onClickDelete, onClickDetail, imageUrl}: ProductCardProps) => {
    return(
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className={'h-60'}><img src={imageUrl ?? "./noimage.jpg"} alt={name} /></figure>
            <div className="card-body">
                <h3 className="card-title font-bold">{name}</h3>
                <p className={'font-semibold text-lg'}>{convertCurrency("Rp", price)}</p>
                <div className="card-actions justify-end flex">
                    <button onClick={onClickDelete} className="btn bg-[#D04848] text-slate-200 hover:bg-[#A94438]">Hapus</button>
                    <button onClick={onClickDetail} className="btn btn-primary">Lihat Detail</button>
                </div>
            </div>
        </div>
    )
}