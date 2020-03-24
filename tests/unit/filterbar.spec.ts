import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import FilterBar from '@/components/FilterBar.vue'
import { mockData } from '@/components/mockData'
import { getters, mutations } from '../../src/store/deviceManagement.module'
import { IDevice } from '../../src/typings/typings'
import { testDefaultOptions, testSelectedFilters } from './testdata/filterOptions.data'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('FilterBar.vue', () => {
    let wrapper: any
    let mockMutations: any
    let store: any

    beforeEach(() => {
        mockMutations = {
            selectFilters: jest.fn(),
        }
        store = new Vuex.Store({
            state: {},
            mutations: mockMutations,
        })
        wrapper = mount(FilterBar, { store, localVue })
    })
    afterEach(() => {
        wrapper = null
    })

    it('should add defaulttags to options ', async () => {
        wrapper.setProps({
            defaultOptions: testDefaultOptions,
        })

        await localVue.nextTick()
        // check if select options exist
        expect(wrapper.find('.multiselect__element').exists()).toBe(true)

        // There are two extra entries for the grouping labels
        expect(wrapper.findAll('.multiselect__element').length).toEqual(5)
    })

    it('should return no select options if list is empty', () => {
        // Select options should not exist if list is empty
        expect(wrapper.find('.multiselect__element').exists()).toBe(false)
        expect(wrapper.findAll('.multiselect__element').length).toBe(0)
    })

    /*it('should add a custom filter', () => {
        // Should be empty before adding a Tag
        expect(wrapper.findAll('.multiselect__element').length).toEqual(0)
        // Add a new Tag via Input Field
        const inputField = wrapper.find('.multiselect__input')
        inputField.setValue('brandNewTag')
        inputField.trigger('keyup.enter')

        const option = wrapper.find('.multiselect__option')
        option.trigger('click')

        const selectedTags = wrapper.find('.multiselect__tags')
        expect(selectedTags.findAll('.multiselect__tag').length).toBe(1)
        expect(selectedTags.find('.multiselect__tag').text()).toMatch('brandNewTag')

        // new Tag should be added
        expect(wrapper.findAll('.multiselect__element').length).toEqual(2)
    })*/

    it('should not add a tag, tag length == 0', () => {
        // Should be empty before adding a Tag
        expect(wrapper.findAll('.multiselect__element').length).toEqual(0)

        // Add a new Tag via Input Field
        const inputField = wrapper.find('.multiselect__input')
        inputField.setValue('')
        inputField.trigger('click')

        // new Tag should not be added
        expect(wrapper.findAll('.multiselect__element').length).toEqual(0)
    })
})

describe('FilterBar.vue', () => {
    let defaultDeviceList: IDevice[]
    beforeEach(() => {
        defaultDeviceList = mockData
    })
    it('should return a filtered device list', () => {
        const state: any = {
            deviceList: defaultDeviceList,
            selectedFilters: [],
            activeCard: 'urgent',
            excludedCategories: [],
            activeNavItem: '',
            mobileFormat: false,
            sidebarCollapsed: false,
            deviceDetail: {
                name: '',
                device_id: '',
                id: '',
                tags: [],
                master_data: [],
            },
            allDeviceData: [],
        }

        mutations.selectFilters(state, [testSelectedFilters[0]])
        expect(getters.getFilteredDevices(state).length).toEqual(13)

        mutations.selectFilters(state, testSelectedFilters)

        expect(getters.getFilteredDevices(state).length).toEqual(7)
        expect(getters.getFilteredDevices(state)[0].id).toEqual('1')
    })
})
