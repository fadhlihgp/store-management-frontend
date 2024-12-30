import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

export interface IOption {
    id: string | number | null;
    name: string;
}

interface ComboBoxProps {
    labelTitle?: string;
    placeHolder?: string;
    isRequired?: boolean;
    options: IOption[];
    defaultValue?: IOption | null; // Add defaultValue prop
    isDisabled?: boolean;
    onChange?: (selected: IOption | null) => void;
}

export function ComboBox({ labelTitle, placeHolder, options, defaultValue, onChange, isRequired = false, isDisabled = false }: ComboBoxProps) {
    const [selected, setSelected] = useState<IOption | null>(defaultValue || null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue);
        } else {
            setSelected(null)
        }
    }, [defaultValue]);

    const filteredPeople =
        query === ''
            ? options
            : options.filter((option) =>
                option.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    const handleSelect = (option: IOption | null) => {
        setSelected(option);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div className="">
            <Combobox value={selected} onChange={handleSelect} disabled={isDisabled}>
                {labelTitle && (
                    <label className="label">
                        <span className="label-text text-base-content">{labelTitle} {isRequired ? <span className="text-red-600 text-lg">*</span> : ""}</span>
                    </label>
                )}
                <div className="relative mt-1">
                    <div className="relative">
                        <Combobox.Input
                            required={isRequired}
                            className={`input input-bordered w-full items-center text-sm `}
                            displayValue={(option: IOption | null) => option ? option.name : ''}
                            title="Testing"
                            placeholder={placeHolder}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        {!isDisabled && (
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        )}
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-10">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Data Tidak Ditemukan.
                                </div>
                            ) : (
                                filteredPeople.map((option) => (
                                    <Combobox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {option.name}
                                                </span>
                                                {selected && (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );

}