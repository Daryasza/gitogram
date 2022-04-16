import { feeds } from '../pages/feeds'
import { stories } from '../pages/stories'
import { auth } from '../pages/auth'

export default [
  {
    path: '/auth',
    component: auth,
    name: 'auth'
  },
  {
    path: '/stories',
    component: stories,
    name: 'stories',
    props: true
  },
  {
    path: '/',
    component: feeds,
    name: 'root',
    props: true
  }
]
