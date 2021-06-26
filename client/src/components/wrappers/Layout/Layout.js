import React from 'react'
import cls from './Layout.module.scss'

import Container from "../Container/Container"
import HomeLink from "../../ui/HomeLink/HomeLink";
import Logo from "../../ui/Logo/Logo";

const Layout = ({children}) => {
    return (
        <div className={cls.box}>
            <div className={cls.header}>
                <Logo/>
                <HomeLink/>
            </div>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export default Layout