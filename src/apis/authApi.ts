import { AUTH_API } from '~/constants'
import { Auth } from '~/types/auth.type'
import axiosClient from '~/utils/httpClient'

const authApi = {
  login() {
    const url = AUTH_API.LOGIN
    return axiosClient.get<Auth>(url)
  },
}

export default authApi
