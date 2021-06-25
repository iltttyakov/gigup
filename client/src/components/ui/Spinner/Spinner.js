import React from 'react'
import cls from './Spinner.module.scss'
import {ClipLoader} from "react-spinners"

const Spinner = () => {
    return (
        <div className={cls.container}>
            <ClipLoader color={'#FFFD12'} size={50}/>
        </div>
    )
}

export default Spinner