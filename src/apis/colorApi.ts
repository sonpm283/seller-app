import { COLOR_API } from '~/constants'
import { Color } from '~/types/color.type'
import axiosClient from '~/utils/httpClient'

const colorApi = {
  getColorList() {
    const url = COLOR_API.COLORS
    return axiosClient.get<Color[]>(url)
  },
}

export default colorApi
