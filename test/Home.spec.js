
import { shallow } from '@vue/test-utils'
import Home from '../src/components/Home.vue'

describe('Home.vue', () => {
  it('Test header', () => {
    const wrapper = shallow(Home)
    const message = wrapper.find('h2').text()
    expect(message).toBe("Welcome to Food Supply Monitor")
  })
})