import React from 'react'
import cls from './Form.module.scss'
import Button from "../Button/Button";

export default {
    Title: ({children}) => <h3>{children}</h3>,
    Container: ({onSubmit, children}) => <form onSubmit={onSubmit} className={cls.container}>{children}</form>,
    Item: ({children}) => <div className={cls.item}>{children}</div>,
    Button: ({disabled = false, children}) => <Button
        type={'submit'}
        rock={true}
        disabled={disabled}
    >
        {children}
    </Button>,
}