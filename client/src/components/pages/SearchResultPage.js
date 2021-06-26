import React, {useEffect} from 'react'
import Layout from "../wrappers/Layout/Layout"
import PageHeader from "../ui/PageHeader/PageHeader"
import Title from "../ui/Title/Title"
import {useSelector} from "react-redux"
import SearchResult from "../containers/SearchResult"
import Button from "../ui/Button/Button"
import usersServices from "../../redux/users/usersServices";

const SearchResultPage = () => {
    const activeFilters = useSelector(state => state.users.activeFilters)
    const instrumentList = useSelector(state => state.users.instrumentList)

    const getInstrumentName = () => {
        if (instrumentList && activeFilters) {
            for (let i = 0; i < instrumentList.length; i++) {
                if (instrumentList[i].id == activeFilters.instrument) return instrumentList[i].name
            }
        }

        return 'Не выбран'
    }

    useEffect(() => usersServices.userListFetch(activeFilters), [])

    return (
        <Layout>
            <PageHeader>
                <Title>Инструмент: {getInstrumentName()}</Title>
            </PageHeader>
            <SearchResult/>
            <Button type={'link'} to={'/search'}>Обновить критерии поиска</Button>
        </Layout>
    )
}

export default SearchResultPage