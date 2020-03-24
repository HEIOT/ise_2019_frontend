import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import ManageMasterData from '@/components/ManageDevice/ManageMasterdataCategory.vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { actions, mutations } from '@/store/categoryManagement.module'

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
    get: (url_param: any, body_param: any) => {
        return new Promise(resolve => {
            if (mockError) throw Error()

            url = url_param
            body = body_param
            resolve(true)
        })
    },
}))

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(ElementUI)

describe('ManageMasterdataCategory.vue', () => {
    let store: any
    let state: any
    let getters: any

    beforeEach(() => {
        state = {
            categories: ['category1', 'category2'],
            tags: ['tag1', 'tag2'],
        }

        getters = {
            getTags: () => {
                return state.tags
            },
            getMasterDataCategories: () => {
                return state.categories
            },
        }
        store = new Vuex.Store({
            state,
            getters,
            actions,
            mutations,
        })
    })

    it('should mount the component', () => {
        const wrapper = shallowMount(ManageMasterData, {
            store,
            localVue,
        })
        const vm: any = wrapper.vm

        // Call all functions that are already tested in the store
        vm.createMasterdataCategory()
        vm.modifyMasterdataCategory('', '')
        vm.deleteMasterdataCategory('')

        expect(wrapper.exists()).toBe(true)
    })
    it('should create a category and clear the value', () => {
        const wrapper = shallowMount(ManageMasterData, {
            store,
            localVue,
        })
        const vm: any = wrapper.vm
        vm.value = '  '
        vm.resetValue()
        expect(vm.value).toBe('')
    })
    it('should open a dialog', () => {
        const wrapper = shallowMount(ManageMasterData, {
            store,
            localVue,
        })
        const vm: any = wrapper.vm
        vm.open('Test')
        // expect(wrapper.find('.el-message-box').exists()).toBe(true)
    })
})
