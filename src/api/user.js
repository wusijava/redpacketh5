import axios from '../config/axios'
import api from './'

export async function login(params){
    const result = await axios.post(api.user.login, params)
    return result
}
export async function register(params){
    const result = await axios.post(api.user.register, params)
    return result
}
export async function exit(params){
    const result = await axios.post(api.user.exit, params)
    return result
}
export async function change(params){
    const result = await axios.post(api.user.change, params)
    return result
}
