import axiosAPI from "./axiosApi";
import {
    USER_SIGN_UP_API_URL,
    INSTRUMENT_LIST_API_URL,
    GENRE_LIST_API_URL,
    TOKEN_OBTAIN_API_URL,
    USER_ME_API_URL,
    USER_LIST_API_URL, USER_API_URL
} from "../urls"

class UsersApi {
    static async instrumentListFetch() {
        return axiosAPI.get(INSTRUMENT_LIST_API_URL)
    }

    static async genreListFetch() {
        return axiosAPI.get(GENRE_LIST_API_URL)
    }

    static async signUp(data) {
        return axiosAPI.post(
            USER_SIGN_UP_API_URL,
            data,
            {headers: {"Content-Type": "multipart/form-data",},}
        )
    }

    static async login(phone, password) {
        return axiosAPI.post(TOKEN_OBTAIN_API_URL, {phone, password})
    }

    static async me() {
        return axiosAPI.get(USER_ME_API_URL)
    }

    static async userMeUpdate(data) {
        return axiosAPI.post(
            USER_ME_API_URL,
            data,
            {headers: {"Content-Type": "multipart/form-data",},}
        )
    }

    static async logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    static isAuthenticated() {
        const token = localStorage.getItem("access_token")
        return !!token
    }

    static userListFetch(filters = {}) {
        return axiosAPI.get(USER_LIST_API_URL, {params: filters})
    }

    static userFetch(id) {
        return axiosAPI.get(USER_API_URL(id))
    }
}

export default UsersApi