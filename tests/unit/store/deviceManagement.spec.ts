import { actions } from '@/store/deviceManagement.module'
// import { ITag } from '@/typings/typings'

let url = ''
let body = {}
const mockError = false

jest.mock('axios', () => ({
    post: (url_param: any, body_param: any) => {
        return new Promise(resolve => {
            if (mockError) throw Error()

            url = url_param
            body = body_param
            resolve(true)
        })
    },
    get: (url_param: any) => {
        return new Promise(resolve => {
            if (mockError) throw Error()

            url = url_param
            resolve(true)
        })
    },
}))

describe('deviceManagement', () => {
    it('updateDevice', async () => {
        const commit = jest.fn()
        const device = {
            id: 'test_id',
            name: 'test_name',
            device_id: 'test_device_id',
            tags: ['tag1', 'tag2'],
            master_data: [],
        }

        await actions.updateDevice({ commit }, device)

        expect(url).toBe('http://localhost/api/devicemanagement/updateDevice')
        expect(body).toEqual(device)
        expect(commit).toHaveBeenCalledWith('updateDeviceDetail', device)
    })

    it('registerDevice', async () => {
        const device = {
            name: 'test_name',
            device_id: 'test_device_id',
            tags: ['tag1', 'tag2'],
            master_data: [],
        }

        await actions.registerDevice({}, device)
        expect(url).toBe('http://localhost/api/devicemanagement/registerDevice')
        expect(body).toEqual(device)
    })

    it('deleteDevice', async () => {
        const id = 'test_id'

        await actions.deleteDevice({}, id)
        expect(url).toBe('http://localhost/api/devicemanagement/deleteDevice')
        expect(body).toEqual({ id })
    })

    it('getDevicesFromDb', async () => {
        await actions.getDevicesFromDb({})
        expect(url).toBe('http://localhost/api/devicemanagement/getAllDevices')
    })

    it('loadDevice', async () => {
        const id = 'test_id'

        await actions.loadDevice({}, id)
        expect(url).toBe('http://localhost/api/devicemanagement/getDevice?id=test_id')
    })
})
