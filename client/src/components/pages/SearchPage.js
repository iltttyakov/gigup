import React from 'react'
import Layout from "../wrappers/Layout/Layout"
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import SearchForm from "../containers/SearchForm";

const SearchPage = () => {
    return (
        <Layout>
            <PageHeader>
                <Title>Найди нужного музыканта в твоем городе</Title>
            </PageHeader>
            <SearchForm/>
        </Layout>
    )
}

export default SearchPage