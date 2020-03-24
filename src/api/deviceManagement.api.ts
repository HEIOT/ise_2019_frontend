import axios from 'axios'
import urls from './endpoints.config'

import { IDevice, ITag, ICategory, IDeviceState } from '@/typings/typings'

export function registerDevice(device: IDevice): Promise<any> {
    return axios.post(urls.deviceManagement.registerDevice, device)
}

export function updateDevice(device: IDevice): Promise<any> {
    return axios.post(urls.deviceManagement.updateDevice, device)
}

export function changeState(newState: IDeviceState): Promise<any> {
    return axios.post(urls.deviceManagement.changeState, newState)
}

export function deleteDevice(id: string): Promise<any> {
    return axios.post(urls.deviceManagement.deleteDevice, { id })
}

export function createMasterDataCategory(masterDataCategory: ICategory): Promise<void> {
    return axios.post(urls.masterDataManagement.createCategory, {
        category: masterDataCategory,
    })
}
export function createTag(tag: string): Promise<any> {
    return axios.post(urls.deviceManagement.createTag, {
        tag,
    })
}
export function deleteTag(tag: string): Promise<any> {
    return axios.post(urls.deviceManagement.deleteTag, {
        tag,
    })
}

export function getTags() {
    return axios.get(urls.deviceManagement.getTags)
}

export function deleteMasterDataCategory(masterdataCategory: ICategory) {
    return axios.post(urls.masterDataManagement.deleteCategory, {
        category: masterdataCategory,
    })
}

export function modifyMasterDataCategory(oldMasterDataCategory: ICategory, newMasterDataCategory: ICategory) {
    return axios.post(urls.masterDataManagement.modifyCategory, {
        oldCategory: oldMasterDataCategory,
        category: newMasterDataCategory,
    })
}

export function getMasterDataCategories(): Promise<any> {
    return axios.get(urls.masterDataManagement.getCategories)
}

export function getDevicesFromDb() {
    return axios.get(urls.deviceManagement.getAllDevices)
}

export function getDevice(id: string) {
    return axios.get(urls.deviceManagement.getDevice + '?id=' + id)
}
