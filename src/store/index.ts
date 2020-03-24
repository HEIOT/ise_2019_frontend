import Vue from 'vue'
import Vuex from 'vuex'
import { IData, IAnomaly } from '../typings/typings'
import { loadDataForDeviceWithTimeRange, loadLatestDeviceData, loadAllAnomalyDatabyId } from '@/api/dataAnalysis.api'

import categoryManagement from './categoryManagement.module'
import tagManagement from './tagManagement.module'
import deviceManagement from './deviceManagement.module'
import stateCards from './stateCard.module'

Vue.use(Vuex)

const initialState = {}

export const getters: any = {}

export const mutations: any = {}

export const actions = {
    async loadDeviceDataWithTimeRange(
        {}: any,
        { deviceId, startDate, endDate }: { deviceId: number; startDate: string; endDate: string }
    ): Promise<IData[]> {
        return (await loadDataForDeviceWithTimeRange(deviceId, startDate, endDate)).data.map((data: any) => ({
            ...data,
            date: new Date(data.date),
        }))
    },

    async loadLatestDeviceData({}: any, { deviceId, limit }: { deviceId: number; limit?: number }): Promise<IData[]> {
        return (await loadLatestDeviceData(deviceId, limit)).data.map((data: any) => ({
            ...data,
            date: new Date(data.date),
        }))
    },

    async loadAllAnomalyDataById({}: any, { deviceId }: { deviceId: number }): Promise<IAnomaly[]> {
        return (await loadAllAnomalyDatabyId(deviceId)).data.map((data: any) => ({
            ...data,
            timestamp: new Date(Number(data.timestamp) * 1000),
        }))
    },
}

export default new Vuex.Store({
    state: initialState,
    mutations,
    getters,
    actions,
    modules: {
        categoryManagement,
        tagManagement,
        deviceManagement,
        stateCards,
    },
})
