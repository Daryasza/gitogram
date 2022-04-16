import { createStore } from 'vuex'
import feeds from './modules/feeds'
import feed from './modules/feed'
import slider from './modules/slider'
import user from './modules/user'

export default createStore({
  modules: {
    feeds,
    feed,
    slider,
    user
  }
})
