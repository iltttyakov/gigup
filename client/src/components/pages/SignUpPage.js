import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import SubTitle from "../ui/SubTitle/SubTitle"
import SignUp from "../containers/SignUp"
import LinkButton from "../ui/LinkButton/LinkButton"


const SignUpPage = () => {
    return (
        <Layout>
            <PageHeader>
                <Title>Музыкальная социальная сеть GetBand</Title>
                <SubTitle>Найди нужных музыкантов для совместных проектов в своём городе</SubTitle>
            </PageHeader>
            <Title marginBottom={25}>Заполни страницу и стань частью музыкального сообщества</Title>
            <SignUp/>
            <LinkButton to={'/login'}>Войти в существующий аккаунт</LinkButton>
        </Layout>
    )
}

export default SignUpPage