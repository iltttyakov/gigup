import axios from "axios"
import {BASE_API_URL, TOKEN_REFRESH_API_URL} from "../urls"

const accessToken = localStorage.getItem("access_token")

const axiosAPI = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    headers: {
        Authorization: accessToken ? "JWT " + accessToken : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
})

axiosAPI.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config

        // Prevent infinite loops
        if (
            error.response.status === 401
            && originalRequest.url === TOKEN_REFRESH_API_URL
        ) {
            // window.location.href = '/'
            return Promise.reject(error)
        }

        if (error.response.data.code === "token_not_valid"
            && error.response.status === 401
            && error.response.statusText === "Unauthorized") {

            const refreshToken = localStorage.getItem('refresh_token')

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000)

                if (tokenParts.exp > now) {
                    return axiosAPI
                        .post(TOKEN_REFRESH_API_URL, {refresh: refreshToken})
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access)
                            localStorage.setItem('refresh_token', response.data.refresh)

                            axiosAPI.defaults.headers['Authorization'] = "JWT " + response.data.access
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access

                            return axiosAPI(originalRequest)
                        })
                        .catch(err => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('refresh_token')
                            console.log(err)
                        })
                } else {
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    console.log("Refresh token is expired", tokenParts.exp, now)
                    window.location.href = '/'
                }
            } else {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                console.log("Refresh token not available.")
                window.location.href = '/'
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error)
    }
)

export default axiosAPI