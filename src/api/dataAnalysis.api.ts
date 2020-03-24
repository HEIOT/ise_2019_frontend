import axios from 'axios'
import urls from './endpoints.config'

export function loadDataForDeviceWithTimeRange(deviceId: number, startDate: string, endDate: string) {
    return axios.get(urls.dataAnalysis.getDataForDeviceWithTimeRange, {
        params: {
            device_id: deviceId,
            startDate,
            endDate,
        },
    })
}

export function loadLatestDeviceData(deviceId: number, limit?: number) {
    const params: any = { device_id: deviceId }
    if (limit) params.limit = limit
    return axios.get(urls.dataAnalysis.getLatestDeviceData, { params })
}

export function loadAllAnomalyDatabyId(deviceId: number) {
    const params: any = { device_id: deviceId }
    return axios.get(urls.dataAnalysis.getAllAnomalyDataById, { params })
}
