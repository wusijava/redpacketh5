import axios from '../config/axios'
import api from './'

export async function orderList(params){
    const result = await axios.post(api.order.list,params);
    return result;
}

export async function orderDetail(params){
    const result = await axios.post(api.order.detail,params);
    return result;
}



