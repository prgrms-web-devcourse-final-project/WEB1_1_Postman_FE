import React from 'react';
import { MdOutlineManageSearch } from 'react-icons/md';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (value: string) => void;
    placeholder: string;
    width?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onSubmit,
    placeholder,
    width = 330
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-[#EEEEEE] rounded-[12px] px-5 py-3 flex items-center"
            style={{ width: `${width}px` }}
        >
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                className="pr-[12px] w-full bg-[#EEEEEE] outline-none text-sm"
            />
            <button
                type="submit"
                className="absolute right-[10px] top-1/2 transform -translate-y-1/2 text-gray-500"
            >
                <MdOutlineManageSearch className="text-[24px]" />
            </button>
        </form>
    );
};
