import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import SubTitle from "../ui/SubTitle/SubTitle"
import Button from "../ui/Button/Button"

const WelcomePage = () => {
    return (
        <Layout>
            <PageHeader>
                <Title>Музыкальная социальная сеть Gigup</Title>
                <SubTitle>Найди нужных музыкантов для совместных проектов в своём городе</SubTitle>
            </PageHeader>
            <Button type={'link'} to={'/login'} rock={true}>Войти</Button>
            <Button type={'link'} to={'/signup'} rock={true}>Создать аккаунт</Button>
        </Layout>
    )
}

export default WelcomePage