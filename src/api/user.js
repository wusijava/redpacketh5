import axios from '../config/axios'
import api from './'

export async function login(params){
    const result = await axios.post(api.user.login, params)
    return result
}
