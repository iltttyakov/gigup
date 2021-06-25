import React from 'react'
import cls from './Button.module.scss'
import {Link} from "react-router-dom";

const Button = ({type = 'button', onClick = null, to = null, rock = false, disabled=false, children}) => {
    const buttonCls = [cls.box]

    if (rock) buttonCls.push(cls.rock)

    if (type === 'button' || type === 'submit') {
        return <button type={type} className={buttonCls.join(' ')} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    } else if (type === 'link') {
        return <Link className={buttonCls.join(' ')} to={to} disabled={disabled}>{children}</Link>
    }
}

export default Button