import Vue from 'vue'
import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import DeviceList from '@/components/DeviceList.vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('MyComponent', () => {
    let getters: any
    let store: any
    let state: any

    const tableData = [
        {
            id: 1,
            name: 'Test',
        },
    ]

    beforeEach(() => {
        state = {
            mobileFormat: false,
        }

        getters = {
            getMobileFormat: () => {
                return state.mobileFormat
            },
        }
        store = new Vuex.Store({
            state,
            getters,
        })
    })

    // Inspect the raw component options
    it('correctly sets the tableData when created', () => {
        const wrapper = shallowMount(DeviceList, {
            store,
            localVue,
            propsData: { tableData },
        })
        expect(wrapper.vm.$options.propsData).toEqual({ tableData })
    })

    // Check if message is displayed when no deviceList is empty
    /* We need to change the test because no-data-info is displayed somewhere else
    it('correctly displays no data text if tableData is empty', () => {
        const vm: any = new ctor({ propsData: { tableData: null } }).$mount()
        expect(vm.$el.textContent).toMatch('There are currently no devices with this state')
        expect(vm.$refs.deviceTable).toBeUndefined()
    })*/

    it('correctly display the tableData in the table', () => {
        const wrapper = shallowMount(DeviceList, {
            store,
            localVue,
            propsData: { tableData },
        })
        expect(wrapper.vm.$refs.deviceTable).toBeDefined()
    })
})
