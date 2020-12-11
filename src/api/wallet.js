import axios from '../config/axios'
import api from './'

export async function getWallet(params){
    const result = await axios.post(api.wallet.getWallet, params)
    return result
}
export async function changeAccount(params){
    const result = await axios.post(api.wallet.changeAccount, params)
    return result
}
export async function transfer(params){
    const result = await axios.post(api.wallet.transfer, params)
    return result
}
export async function getReceiveList(params){
    const result = await axios.post(api.wallet.getReceiveList, params)
    return result
}