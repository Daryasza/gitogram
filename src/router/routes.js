import { auth } from '../pages/auth'
import { feeds } from '../pages/feeds'
import { stories } from '../pages/stories'
import { profile } from '../pages/profile'
import { following } from '../pages/following'

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
    path: '/profile',
    component: profile,
    name: 'profile',
    props: true
  },
  {
    path: '/following',
    component: following,
    name: 'following',
    props: true
  },
  {
    path: '/',
    component: feeds,
    name: 'root',
    props: true
  }
]
