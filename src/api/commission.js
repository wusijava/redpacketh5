import axios from '../config/axios'
import api from './'

export function getPage(){
    return api.commission.getPage;
}

export async function getStoreInfo(params){
    const result = await axios.post(api.commission.getStoreInfo,params);
    return result;
}

export async function submitInformation(params){
    const result = await axios.post(api.commission.submitInformation,params);
    return result;
}

export async function selectReceiver(params){
    const result = await axios.post(api.commission.selectReceiver,params);
    return result;
}

export async function queryRedPacket(params){
    const result = await axios.post(api.commission.queryRedPacket,params);
    return result;
}

export async function queryRedPacketRecord(params){
    const result = await axios.post(api.commission.getRebateRecord,params);
    return result;
}

export async function changeUser(params){
    const result = await axios.post(api.commission.changeUser,params);
    return result;
}

export async function getRedPacket(params){
    const result = await axios.post(api.commission.getRedPacket,params);
    return result;
}

