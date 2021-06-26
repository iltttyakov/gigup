import React from 'react'
import cls from './Social.module.scss'
import Icons from "../Icons/Icons";

const Social = ({socialName, data}) => {
    let link = ''

    if (socialName === 'telegram') {
        link = `https://telegram.me/${data}`
    } else if (socialName === 'vk') {
        link = `https://vk.com/${data}`
    } else if (socialName === 'instagram') {
        link = `https://www.instagram.com/${data}/`
    } else if (socialName === 'whatsapp') {
        const phone = data
            .replace('-', '')
            .replace('-', '')
            .replace('+', '')
            .replace('(', '')
            .replace(')', '')
            .replace(' ', '')
            .replace(' ', '')
        link = `https://wa.me/${phone}`
    }

    return (
        <a href={link} target={'_blank'} className={cls.link}>
            <Icons
                name={`icon-${socialName}`}
                className={cls.icon}
            />
        </a>
    )
}

export default Social