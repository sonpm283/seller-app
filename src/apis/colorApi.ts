import { COLOR_API } from '~/constants'
import { Color, CreateColor } from '~/types/color.type'
import axiosClient from '~/utils/httpClient'

const colorApi = {
  getColorList() {
    const url = COLOR_API.COLORS
    return axiosClient.get<Color[]>(url)
  },
  addColor(color: CreateColor) {
    const url = COLOR_API.COLORS
    return axiosClient.post(url, color)
  },
  deleteColor(id: number) {
    const url = `${COLOR_API.COLORS}/${id}`
    return axiosClient.delete(url)
  },
}

export default colorApi
