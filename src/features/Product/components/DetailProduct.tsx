
interface DetailProductProps {
    imageUrl?: string,
    stock: number,
    description?: string,
    barcode?: string
}

export const DetailProduct = ({barcode, description, stock, imageUrl}:DetailProductProps) => {
    return(
        <div className={'flex flex-col md:flex-col gap-5'}>

            <div className={'w-80 h-60'}>
                <img src={imageUrl ?? "./noimage.jpg"} alt={'image'}/>
            </div>

            <div className="mt-3">
                <dl className="divide-y divide-gray-200">
                    <div className="px-4 py-3 sm:grid sm:grid-cols-1 sm:gap-2 sm:px-0">
                        <p className="font-medium leading-6 text-lg">Stok</p>
                        <p className="mt-1 text-lg leading-6 sm:col-span-2 sm:mt-0">{stock}</p>
                    </div>
                    <div className="px-4 py-3 sm:grid sm:grid-cols-1 sm:px-0">
                        <p className="text-lg font-medium leading-6">Deskripsi </p>
                        <p className="mt-1 text-lg leading-6 sm:col-span-2 sm:mt-0">{description}</p>
                    </div>
                    <div className={' py-3'}>
                        <button className={`btn btn-sm btn-success text-slate-200`} disabled={!barcode}>Tampilkan Barcode</button>
                    </div>
                </dl>
            </div>
        </div>
    )
}