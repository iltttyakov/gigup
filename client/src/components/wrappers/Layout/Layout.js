import React from 'react'
import cls from './Layout.module.scss'

import Container from "../Container/Container"
import HomeLink from "../../ui/HomeLink/HomeLink";
import LogoutButton from "../../ui/LogoutButton/LogoutButton";

const Layout = ({children}) => {
    return (
        <div className={cls.box}>
            <HomeLink/>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export default Layout