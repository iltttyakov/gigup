import React from 'react'
import cls from './ErrorMessage.module.scss'

const ErrorMessage = ({children}) => <span className={cls.container}>{children}</span>

export default ErrorMessage