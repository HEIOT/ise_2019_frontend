const baseUrl = window.location.origin + '/api'
// const baseUrl = 'http://ise.local/api'
// const baseUrl = 'http://localhost:3000/api'

const endpoints = {
    deviceManagement: {
        registerDevice: baseUrl + '/devicemanagement/registerDevice',
        updateDevice: baseUrl + '/devicemanagement/updateDevice',
        deleteDevice: baseUrl + '/devicemanagement/deleteDevice',
        createTag: baseUrl + '/devicemanagement/createTag',
        deleteTag: baseUrl + '/devicemanagement/deleteTag',
        getTags: baseUrl + '/devicemanagement/getTags',
        getAllDevices: baseUrl + '/devicemanagement/getAllDevices',
        getDevice: baseUrl + '/devicemanagement/getDevice',
        changeState: baseUrl + '/devicemanagement/changeState',
    },
    masterDataManagement: {
        createCategory: baseUrl + '/devicemanagement/createCategory',
        deleteCategory: baseUrl + '/devicemanagement/deleteCategory',
        modifyCategory: baseUrl + '/devicemanagement/modifyCategory',
        getCategories: baseUrl + '/devicemanagement/getCategories',
    },
    dataAnalysis: {
        getDataForDeviceWithTimeRange: baseUrl + '/datastore/getDataForDeviceWithTimeRange',
        getLatestDeviceData: baseUrl + '/datastore/getLatestDataForDevice',
        getAllAnomalyDataById: baseUrl + '/analytics/getAnomaliesByDeviceId',
    },
}

export default endpoints
