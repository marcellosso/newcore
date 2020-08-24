import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const Input : React.FC<InputProps> = ({ name, ...rest }) => {
    
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, inputRef]);

    return (
        <div className="containerMain" style={{ borderColor: isFocused ? '#640c19' : 'rgb(192, 191, 191)' }}>
            <input 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                defaultValue={defaultValue} 
                ref={inputRef} 
                {...rest} />

            {error}
        </div>
    )
}

export default Input;