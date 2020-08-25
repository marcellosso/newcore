import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { mask, unMask } from 'remask';

import CurrencyInput from 'react-currency-masked-input';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {

    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    // const [cpf, setCPF] = useState('35388431800');
    const [maskedCPF, setMasked] = useState('');
    const [income, setIncome] = useState('');
    const { fieldName, defaultValue, error, registerField } = useField(name);



    const pattern = '999.999.999-99';
    const patternMoney = '999.999.999.999,99';

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, inputRef]);

    const onHandleChange = e => {
        let cpf = e.target.value;
        let masked = mask(cpf, pattern);

        setMasked(masked);
    }


    // console.log(defaultValue);

    return (
        <div className="containerMain" style={{ borderColor: isFocused ? '#640c19' : 'rgb(192, 191, 191)' }}>

            {fieldName == 'cpf' ?
                <input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    defaultValue={defaultValue}
                    ref={inputRef}
                    value={maskedCPF}
                    onChange={onHandleChange}
                    {...rest} />
                :

                fieldName == 'income' ?
                    // <input
                    //     onFocus={() => setIsFocused(true)}
                    //     onBlur={() => setIsFocused(false)}
                    //     defaultValue={defaultValue}
                    //     ref={inputRef}
                    //     value={maskedIncome}
                    //     onChange={onHandleChangeIncome}
                    //     {...rest} />
                    <CurrencyInput 
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)} 
                        // value={income || defaultValue}
                        ref={inputRef}
                        {...rest}
                    />
                    :
                    <input
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        defaultValue={defaultValue}
                        ref={inputRef}
                        {...rest} />

            }

            {error}
        </div>
    )
}

export default Input;