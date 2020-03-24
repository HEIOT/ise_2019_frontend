import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Detail from '@/views/Detail.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ManageDeviceMasterdata from '@/components/ManageDevice/Masterdata.vue'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('DeviceEditor.vue', () => {
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
        }
        const actions = {
            deleteDevice({}, id: string) {
                if (state.deviceDetail.id === id) {
                    state.deviceDetail = {}
                }
            },
            getTags: jest.fn(),
            getMasterdataCategories: jest.fn(),
            loadDevice: jest.fn(),
        }
        const mutations = {
            setActiveNavItem: jest.fn(),
            setExcludedCategories: jest.fn(),
        }
        store = new Vuex.Store({
            state,
            getters,
            mutations,
            actions,
        })
    })

    it('get id from params id', () => {
        const $route = {
            path: '/detail',
            params: { id: 'id_from_route' },
        }
        const wrapper = shallowMount(Detail, {
            store,
            localVue,
            mocks: {
                $route,
            },
            stubs: ['router-link'],
        })
        const vm: any = wrapper.vm
        expect(vm.id).toBe('id_from_route')
    })

    it('delete a device', () => {
        const $route = {
            path: '/detail',
            params: { id: 'test_id' },
        }

        const wrapper = shallowMount(Detail, {
            store,
            localVue,
            mocks: {
                $route,
            },
            stubs: ['router-link'],
        })
        const vm: any = wrapper.vm
        vm.deleteDevice()
        expect(store.getters.getDeviceDetail).toEqual({})
    })
})
