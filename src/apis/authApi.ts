import { AUTH_API } from '~/constants'
import { Auth } from '~/types/auth.type'
import axiosClient from '~/utils/httpClient'

const authApi = {
  login(data: Auth) {
    const url = AUTH_API.LOGIN
    return axiosClient.post<Auth>(url, data)
  },
}

export default authApi
