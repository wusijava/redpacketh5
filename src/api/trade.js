import axios from '../config/axios'
import api from './'

export async function getStore(params){
    const result = await axios.post(api.trade.store,params);
    return result;
}

export async function getMealList(params){
    const result = await axios.post(api.trade.mealList,params);
    return result;
}

export async function getCashierList(params){
    const result = await axios.post(api.trade.cashierList,params);
    return result;
}

export async function getPayDetail(params){
    const result = await axios.post(api.trade.payDetail,params);
    return result;
}

export async function createOrder(params){
    const result = await axios.post(api.trade.createOrder,params);
    return result;
}

export async function create(params){
    const result = await axios.post(api.trade.create,params);
    return result;
}

export async function queryContract(params){
    const result = await axios.post(api.trade.queryContract,params);
    return result;
}

export async function saveContract(params){
    const result = await axios.post(api.trade.saveContract,params);
    return result;
}

export async function tradeList(params){
    const result = await axios.post(api.trade.list,params);
    return result;
}

export async function tradeStateQuery(params){
    const result = await axios.post(api.trade.queryState,params);
    return result;
}

export async function getOpenImgState(params){
    const result = await axios.post(api.trade.imgState,params);
    return result;
}

export async function tradeRefund(params){
    const result = await axios.post(api.trade.refund,params);
    return result;
}

export async function createOrderUpload(params){
    const result = await axios.post(api.trade.createOrderUpload,params);
    return result;
}

export async function tradeUploadDetail(params){
    const result = await axios.post(api.trade.tradeUploadDetail,params);
    return result;
}

