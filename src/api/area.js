import axios from '../config/axios'
import api from './'

export async function getAreaList(params){
    const result = await axios.post(api.area.list, params)
    return result
}
