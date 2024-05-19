import InputText2 from "../../../components/Input/InputText2";
import moment from "moment";
import {ComboBox, IOption} from "../../../components/Input/ComboBox";
import {useEffect, useState} from "react";
import {CustomersDummy} from "../../Customer/CustomerDummy";

export const Card1 = () => {
    const [optionsCust, setOptionsCust] = useState<IOption[]>([]);

    useEffect(() => {
        const options = CustomersDummy.map(p => ({
            name: p.fullName,
            id: p.id
        }));
        const general = {
            name: 'Umum',
            id: "-1"
        }

        setOptionsCust([...optionsCust, general, ...options]);
    }, []);

    return(
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <InputText2 labelTitle={"Tanggal"} value={moment(Date.now()).format("DD MMM yyyy hh:mm")} name={"date"} isDisabled={true} />
                <InputText2 labelTitle={"Kasir"} value={"Andi"} name={"name"} isDisabled={true} />
                <ComboBox options={optionsCust} labelTitle={"Pelanggan"} />
            </div>
        </div>
    )
}
