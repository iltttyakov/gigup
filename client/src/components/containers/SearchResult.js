import React from 'react'
import {useSelector} from "react-redux"
import UserList from "../ui/UserList/UserList"
import Spinner from "../ui/Spinner/Spinner";

const SearchResult = () => {
    const userListFetchInProcess = useSelector(state => state.users.userListFetchInProcess)
    const userList = useSelector(state => state.users.userList)

    if (userListFetchInProcess) return <Spinner/>

    return (
        <UserList items={userList}/>
    )
}

export default SearchResult