import React from 'react'
import cls from './Input.module.scss'
import InputMask from 'react-input-mask'
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const Input = ({type, name, onChange, value, placeholder, error, touched, mask}) => {
    return (
        <>
            <div className={cls.container}>
                <InputMask
                    type={type}
                    name={name}
                    value={value}
                    className={cls.field}
                    placeholder={placeholder}
                    onChange={onChange}
                    mask={mask}
                    maskChar={null}
                />
            </div>
            {!!error && touched && (<ErrorMessage>{error}</ErrorMessage>)}
        </>
    )
}

export default Input