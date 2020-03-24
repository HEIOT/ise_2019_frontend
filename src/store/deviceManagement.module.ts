import { IDevice, IStateDeviceManagement, IFilter, IDeviceState } from '../typings/typings'
import {
    registerDevice,
    updateDevice,
    deleteDevice,
    getDevicesFromDb,
    getDevice,
    changeState,
} from '@/api/deviceManagement.api'
import { deviceFilter, createFilterOptionsFromDevicelist } from '@/utils/deviceFilter'
export const initialState: IStateDeviceManagement = {
    selectedFilters: [],
    deviceList: [],
    deviceDetail: {
        id: '',
        name: '',
        device_id: '',
        device_state: '',
        tags: [],
        master_data: [],
    },
    excludedCategories: [],
}

export const mutations: any = {
    initDefaultDevice(state: IStateDeviceManagement, devices: IDevice[]) {
        state.deviceList = devices
    },

    selectFilters(state: IStateDeviceManagement, filters: IFilter[]) {
        state.selectedFilters = filters
    },

    setDeviceDetail(state: IStateDeviceManagement, deviceDetail: IDevice) {
        state.deviceDetail = deviceDetail
    },

    updateDeviceDetail(state: IStateDeviceManagement, deviceDetail: IDevice) {
        state.deviceDetail = deviceDetail
    },
    setExcludedCategories(state: IStateDeviceManagement, category: string[]) {
        state.excludedCategories = category
    },

    updateDeviceState(state: IStateDeviceManagement, newState: IDeviceState) {
        state.deviceDetail.device_state = newState.state
    },
}

export const actions: any = {
    registerDevice({}, device: IDevice) {
        return registerDevice(device)
    },
    updateDevice({ commit }: any, device: IDevice) {
        return updateDevice(device).then(() => {
            commit('updateDeviceDetail', device)
        })
    },
    deleteDevice({}, id: string) {
        return deleteDevice(id)
    },
    changeState({ commit }: any, newState: IDeviceState) {
        return changeState(newState).then(() => {
            commit('updateDeviceState', newState)
        })
    },
    getDevicesFromDb({ commit }: any) {
        getDevicesFromDb().then(result => {
            commit('initDefaultDevice', result.data)
            return result.data
        })
    },
    loadDevice(context: any, id: string): void {
        getDevice(id).then(result => {
            context.commit('setDeviceDetail', result.data)
        })
    },
}

export const getters: any = {
    getFilteredDevices(state: any) {
        if (state.selectedFilters && state.selectedFilters.length) {
            return state.deviceList.filter((device: IDevice) =>
                state.selectedFilters.reduce(deviceFilter(device), true)
            )
        } else {
            return state.deviceList
        }
    },
    getDevices(state: IStateDeviceManagement) {
        return state.deviceList
    },

    getFilterOptions(state: IStateDeviceManagement) {
        return createFilterOptionsFromDevicelist(state.deviceList)
    },

    getDeviceDetail(state: IStateDeviceManagement): IDevice {
        return state.deviceDetail
    },

    getSelectedFilters(state: IStateDeviceManagement) {
        return state.selectedFilters
    },
    getExcludedCategories(state: IStateDeviceManagement) {
        return state.excludedCategories
    },
}

export default {
    state: initialState,
    actions,
    mutations,
    getters,
}
