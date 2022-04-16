import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory('/gitogram/demo/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authRoute = to.name === 'auth'

  if (authRoute) {
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${sessionStorage.getItem('token')}`
        }
      })

      if (res.status === 401) {
        next()
        return
      }
    } catch (error) {
      next({ name: 'root' })
      return
    }
  }

  try {
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${sessionStorage.getItem('token')}`
      }
    })

    if (res.status === 401) {
      throw new Error()
    }
    next()
  } catch (error) {
    next({ name: 'auth' })
  }
})

export default router
