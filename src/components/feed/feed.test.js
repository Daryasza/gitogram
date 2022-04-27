import { mount, createLocalVue } from '@vue/test-utils'
import { createStore } from 'vuex'
import axios from 'axios'

import feed_store from '../../store/modules/feed'
import feed from './feed'

jest.mock("axios", () => (
  jest.fn(() => new Promise((resolve) => {
    resolve({})
  }))
))

const store = createStore({
  modules: {
      feed: feed_store
  }
})

const defaultProps = {
  fullName: 'test-fullName',
  avatar: 'https://avatar.com/test',
  username: 'test-username',
  date: '2021-12-12T12:12:12+000Z',
  withRepoOwner: true
}

describe('"Issues" component', () => {
  it('Span text is changing', async () => {
    const wrapper = mount(feed, { global: { plugins: [store] }, propsData: defaultProps })

    expect(wrapper.find('.btn-wrapper button span').text()).toBe('Show issues')

    await wrapper.find('.btn-wrapper button').trigger('click')

    expect(wrapper.find('.btn-wrapper button span').text()).toBe('Hide issues')
  })

  it('Axios request is sent when click', async () => {
    const wrapper = mount(feed, { global: { plugins: [store] }, propsData: defaultProps })

    await wrapper.find('.btn-wrapper button').trigger('click')

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({ url: "/repos/test-fullName/issues" })
    )
  })

  it('Number of items the same as in request', async () => {
    const issues = [
      { title: "test", user: { login: "user1" } },
      { title: "test", user: { login: "user2" } },
      { title: "test", user: { login: "user3" } }
    ]

    const wrapper = mount(feed, { global: { plugins: [store] }, propsData: defaultProps })

    expect(wrapper.find('.comments__item').exists()).toBe(false)

    // We should push prepared data directly to store because we can't subscribe to getter from test
    store.commit('feed/UPDATE_ISSUES', {fullName: 'test-fullName', issues: issues})

    await wrapper.find('.btn-wrapper button').trigger('click')

    expect(wrapper.findAll('.comments__item').length).toBe(issues.length)
  })

  it('Only 1 axios request is sent when click', async () => {
    const wrapper = mount(feed, { global: { plugins: [store] }, propsData: defaultProps })

    await wrapper.find('.btn-wrapper button').trigger('click')
    await wrapper.find('.btn-wrapper button').trigger('click')
    await wrapper.find('.btn-wrapper button').trigger('click')
    await wrapper.find('.btn-wrapper button').trigger('click')
    await wrapper.find('.btn-wrapper button').trigger('click')
    expect(axios).toHaveBeenCalledTimes(2) /* OPTIONS and GET */
  })
})
