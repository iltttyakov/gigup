import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import Login from "../containers/Login"
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import SubTitle from "../ui/SubTitle/SubTitle"
import LinkButton from "../ui/LinkButton/LinkButton"

const LoginPage = () => {
    return (
        <Layout>
            <PageHeader>
                <Title>Музыкальная социальная сеть Gigup</Title>
                <SubTitle>Найди нужных музыкантов для совместных проектов в своём городе</SubTitle>
            </PageHeader>
            <Title marginBottom={25}>Войти в свой аккаунт</Title>
            <Login/>
            <LinkButton to={'/signup'}>Создать новый аккаунт</LinkButton>
        </Layout>
    )
}

export default LoginPage