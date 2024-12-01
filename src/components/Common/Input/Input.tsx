import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
    name: string;
    text?: string;
    errorMessage?: string;
    pattern?: RegExp;
    togglePassword?: boolean;
    onValueChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

export const Input = ({
    name,
    text,
    errorMessage,
    pattern,
    togglePassword,
    defaultValue,
    onValueChange,
    ...rest
}: InputProps) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue as string);
        }
    }, [defaultValue]);

    useEffect(() => {
        console.log(value);
        if (onValueChange && value !== '') {
            onValueChange(value);
        }
    }, [value]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (newValue.length === 0) {
            setError('');
            return;
        }

        if (pattern) {
            const regex = new RegExp(pattern);
            const isValid = regex.test(newValue);
            setError(isValid ? '' : errorMessage || '');
        }
    };

    if (errorMessage && !pattern)
        console.error('에러를 판단할 패턴이 없습니다.');
    return (
        <div className="relative w-full">
            <input
                className="w-full h-8 px-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                autoComplete="off"
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
                type={
                    togglePassword
                        ? showPassword
                            ? 'text'
                            : 'password'
                        : rest.type
                }
            />
            {togglePassword && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <FaEye size={16} />
                    ) : (
                        <FaEyeSlash size={16} />
                    )}
                </button>
            )}
            {error && (
                <p className="absolute my-1 text-[14px] text-red-500 md:text-base">
                    {error}
                </p>
            )}
        </div>
    );
};
