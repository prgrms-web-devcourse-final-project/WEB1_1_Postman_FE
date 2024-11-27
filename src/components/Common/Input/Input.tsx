import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputProps = {
    name: string;
    text?: string;
    errorMessage?: string;
    pattern?: RegExp;
    togglePassword?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

export const Input = ({
    name,
    text,
    errorMessage,
    pattern,
    togglePassword,
    defaultValue,
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
        <div className="relative mb-6">
            {text && (
                <p className="mb-3 text-14 text-secondary md:text-16">{text}</p>
            )}
            <input
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
                    className="absolute transform right-3 top-1/2 translate-y-1/3 text-gray md:translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
            )}
            {error && (
                <p className="absolute my-1 text-12 text-red md:text-16">
                    {error}
                </p>
            )}
        </div>
    );
};
