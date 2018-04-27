import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ListContainers from '../src/components/ListContainers.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListContainers.vue', () => {
    var getters
    var store

    beforeEach(() => {
        getters = {
            getContainers: () => {}
        }

        store = new Vuex.Store({
            getters
        })
    })
    it('List Containers 1', () => {
        const wrapper = shallow(ListContainers, { store, localVue }, { stubs: ['router-link', 'router-view']})

        wrapper.setComputed( { getContainerItems: () => {} }) 

        const message = wrapper.find('h3').text()
        expect(message).toBe("Container List")
    })
})
