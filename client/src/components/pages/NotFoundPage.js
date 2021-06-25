import React from 'react'
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import Layout from "../wrappers/Layout/Layout"

const NotFoundPage = () => {
    return (
        <Layout>
            <PageHeader>
                <Title>404 Страница не найдена</Title>
            </PageHeader>
        </Layout>
    )
}

export default NotFoundPage