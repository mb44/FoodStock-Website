import { shallow, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ListContainers from '../src/components/ListContainers.vue'
import sinon from 'sinon'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListContainers.vue', () => {
    var getters
    var store

    beforeEach(() => {
        getters = {
            getContainers: () => [ { "containerState": "measure", "currentAmount": 0.2, "emptyContainerWeight": 0.03, "foodName": "Coffee", "maxCapacity": 2, "key": "0" }, { "containerState": "measure", "currentAmount": 0.2, "emptyContainerWeight": 0.03, "foodName": "Milk", "maxCapacity": 0.5, "key": "1" }  ] 
        }

        store = new Vuex.Store({
            getters
        })
    })
    it('List Containers 1', () => {
        const wrapper = shallow(ListContainers, { store, localVue }, { stubs: ['router-link', 'router-view']})

        const tablecell = wrapper.findAll('td').at(4)
        expect(tablecell.text()).toBe("Milk")
    })
    /*
    it('List Containers 2', () => {
        const spy = sinon.spy()
        const wrapper = shallow(ListContainers, { store, localVue } , { stubs: ['router-link', 'router-view']})

        wrapper.setData({ propsData: { editContainer: spy} })

        wrapper.findAll('tr').at(1).trigger('click')
        //spy.should.have.been.calledWith('yes')
        sinon.assert.calledOnce(spy)
    })
    */
})
