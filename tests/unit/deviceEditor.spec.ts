import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import DeviceEditor from '@/components/Detail/DeviceEditor.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { IDevice } from '@/typings/typings'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('Detail.vue', () => {
    let store: any
    beforeEach(() => {
        const state: any = {
            deviceDetail: {
                id: 'test_id',
                name: 'test_name',
                device_id: 'test_device_id',
                tags: ['tag1', 'tag2'],
                master_data: [],
            },
        }

        const getters = {
            getDeviceDetail: () => {
                return state.deviceDetail
            },
            getMasterDataCategories: jest.fn(),
            getTags: jest.fn(),
        }
        const actions = {
            updateDevice({ commit }: any, device: IDevice) {
                state.deviceDetail = device
            },
            getTags: jest.fn(),
            getMasterdataCategories: jest.fn(),
        }
        const mutations = {
            setActiveNavItem: jest.fn(),
            setExcludedCategories: jest.fn(),
        }
        store = new Vuex.Store({
            state,
            getters,
            actions,
            mutations,
        })
    })

    it('update a device', () => {
        const $route = {
            path: '/detail',
            params: { id: 'test_id' },
        }

        const wrapper = shallowMount(DeviceEditor, {
            store,
            localVue,
            propsData: {
                originalDevice: {
                    id: 'test_id',
                    name: 'test_name',
                    device_id: 'test_device_id',
                    tags: ['tag1', 'tag2'],
                    master_data: [],
                },
            },
        })

        const vm: any = wrapper.vm

        vm.device = {
            id: 'test_id',
            name: 'update_name',
            device_id: 'update_device_id',
            tags: ['tag1', 'tag2'],
            master_data: [],
        }

        vm.updateDevice()
        expect(store.getters.getDeviceDetail).toEqual(vm.device)
    })
})
