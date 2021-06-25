import React from 'react'
import cls from './Select.module.scss'
import {Field} from "formik"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const Select = ({items, name, error, touched, defaultOption = null, isLoading = false}) => {
    return (
        <>
            <label className={cls.container}>
                <div className={cls.selectWrapper}>
                    <Field as={'select'} name={name}>
                        {defaultOption ? <option value={0}>{defaultOption}</option> : null}
                        {items.map(item => <option key={item['value']} value={item['value']}>{item['label']}</option>)}
                    </Field>
                    <div className={cls.arrow}/>
                </div>
            </label>
            {!!error && touched && (<ErrorMessage>{error}</ErrorMessage>)}
        </>
    )
}

export default Select