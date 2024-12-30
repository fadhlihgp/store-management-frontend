import { ReactElement, ReactNode } from "react";
import DatePicker from "tailwind-datepicker-react"
import { IOptions } from "tailwind-datepicker-react/types/Options";

interface DatePickerCustomProps {
    value?: Date;
    children?: ReactElement | ReactNode;
    options?: IOptions;
    onChange?: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    classNames?: string;
    selectedDateState?: [Date, (date: Date) => void];
    isRequired?: boolean;
    label: string;
}

export const DatePickerCustom = ({value, children, options, onChange, show, setShow, classNames, selectedDateState, isRequired = false, label}: DatePickerCustomProps) => {
    return(
        <div className={`form-control w-full`}>
            <label className="label">
                <span className={"label-text text-base-content "}>{label} {isRequired ? <span className="text-red-600 font-bold">*</span> : ""}</span>
            </label>
            <DatePicker
                value={value}
                show={show}
                setShow={setShow}
                onChange={onChange}
                children={children}
                classNames={classNames}
                options={options}
                selectedDateState={selectedDateState}
                key={"datepickercustom"}
            />
        </div>
    )
}