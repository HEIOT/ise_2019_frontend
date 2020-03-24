import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import ManageTags from '@/components/ManageDevice/ManageTags.vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

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

describe('ManageTags.vue', () => {
    let store: any
    let actions: any

    beforeEach(() => {
        const state = {
            tags: ['tag1', 'tag2'],
        }

        actions = {
            createTag: jest.fn(),
            deleteTag: jest.fn(),
            getTags: jest.fn(),
        }

        const getters = {
            getTags: (currentState: any) => {
                return currentState.tags
            },
            getMasterDataCategories: (currentState: any) => {
                return currentState.categories
            },
        }
        store = new Vuex.Store({
            state,
            getters,
            actions,
        })
    })

    it('should mount the component', () => {
        const wrapper = shallowMount(ManageTags, {
            store,
            localVue,
        })
        const vm: any = wrapper.vm

        expect(wrapper.exists()).toBe(true)

        const newTagName = 'new-test-tag'

        vm.$data.tag = newTagName
        vm.createTag()
        vm.deleteTags(newTagName)

        expect(actions.createTag).toHaveBeenCalled()
        expect(actions.createTag.mock.calls[0][1]).toMatch(newTagName)
    })
})
