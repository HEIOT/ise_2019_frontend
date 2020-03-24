import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import ElementUI from 'element-ui'
import UpdateStateManually from '@/components/Detail/UpdateStateManually.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('UpdateStateManually.vue', () => {
    let wrapper: Wrapper<UpdateStateManually>

    beforeEach(() => {
        wrapper = mount(UpdateStateManually, {
            localVue,
        })
    })

    it('should show current state as active', async () => {
        wrapper.setProps({
            currentState: 'ok',
        })

        await localVue.nextTick()

        expect(wrapper.find('.option.ok.active').exists()).toBe(true)
        expect(wrapper.find('.option.info.active').exists()).not.toBe(true)

        wrapper.setProps({
            currentState: 'info',
        })

        await localVue.nextTick()

        expect(wrapper.find('.option.ok.active').exists()).not.toBe(true)
        expect(wrapper.find('.option.info.active').exists()).toBe(true)
    })

    it('should show popover on state change click', async () => {
        wrapper.setProps({
            currentState: 'ok',
        })

        const changeToInfoButton = wrapper.find('.option.info')
        changeToInfoButton.trigger('click')

        await localVue.nextTick()

        const visibleVariable = wrapper.vm.$data.states.find((state: any) => state.filterDevice === 'info').visible
        expect(visibleVariable).toBe(true)

        const popovers = wrapper.findAll('.el-popover')
        expect(popovers.isEmpty()).not.toBe(true)

        const visiblePopovers = popovers.wrappers.reduce(
            (sum: number, component: any) => (sum += component.isVisible() ? 1 : 0),
            0
        )

        expect(visiblePopovers).toBeGreaterThan(0)
    })

    it('should emit change state event', async () => {
        wrapper.setProps({
            currentState: 'ok',
        })

        const changeToInfoButton = wrapper.find('.option.info')
        changeToInfoButton.trigger('click')

        await localVue.nextTick()

        const popovers = wrapper.findAll('.el-popover')
        const visiblePopover = popovers.wrappers.find((element: any) => element.isVisible())

        expect(visiblePopover).toBeDefined()
        if (!visiblePopover) return
        visiblePopover.find('.el-button--success').trigger('click')

        await localVue.nextTick()

        expect(wrapper.emitted('change-state')).toBeTruthy()
    })
})
