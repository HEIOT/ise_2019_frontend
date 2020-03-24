import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import RegisterDevice from '@/views/RegisterDevice.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ManageDeviceMasterdata from '@/components/ManageDevice/Masterdata.vue'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('RegisterDevice.vue', () => {
    let store: any
    beforeEach(() => {
        const state = {
            categories: ['category1', 'category2'],
            tags: ['tag1', 'tag2'],
        }

        const getters = {
            getTags: () => {
                return state.tags
            },
            getMasterDataCategoriesGetter: () => {
                return state.categories
            },
        }
        const actions = {
            createTag: ({}, tag: string) => {
                state.tags.push(tag)
            },
            getTags: jest.fn(),
            getMasterdataCategories: jest.fn(),
            registerDevice: jest.fn(),
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

    it('should register a device', () => {
        const $route = {
            path: '/register',
        }
        const wrapper = shallowMount(RegisterDevice, {
            store,
            localVue,
            mocks: {
                $route,
            },
        })
        const vm: any = wrapper.vm
        vm.device = {
            name: 'Test Device',
            deviceId: '1',
            id: '1',
            tags: ['123'],
            masterData: [
                {
                    categoryId: '1',
                    value: 'testmasterdata',
                },
            ],
        }
        expect(vm.device).not.toBe({})
    })
})
