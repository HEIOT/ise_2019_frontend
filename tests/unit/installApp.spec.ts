import { shallowMount, mount, createLocalVue, Wrapper } from '@vue/test-utils'
import InstallCard from '@/components/Overview/InstallCard.vue'
import ElementUI from 'element-ui'

jest.mock('axios')
const localVue = createLocalVue()
localVue.use(ElementUI)

describe('InstallCard.vue', () => {
    it('should hide the card if App installed', () => {
        const wrapper = shallowMount(InstallCard, {
            localVue,
        })
        const vm: any = wrapper.vm
        vm.installApp()
        expect(vm.visible).toBe(false)
    })

    it('should hide the card when card is dismissed', async () => {
        const wrapper = mount(InstallCard, {
            localVue,
        })
        const vm: any = wrapper.vm
        vm.visible = true

        await localVue.nextTick()

        const dismissButton = wrapper.find('.install-cancel')
        dismissButton.trigger('click')

        await localVue.nextTick()

        expect(vm.visible).toBe(false)
    })
})
