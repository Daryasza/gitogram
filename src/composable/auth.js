import { useRouter } from 'vue-router'
import env from '../../env'
// import { computed, ref } from 'vue'

export default (props) => {
  const router = useRouter()

  const getCode = () => {
    const githubAuthApi = 'https://github.com/login/oauth/authorize'
    const params = new URLSearchParams()

    params.append('client_id', env.clientId)
    params.append('scope', 'repo:status read:user user:follow public_repo')

    window.location.href = `${githubAuthApi}?${params}`
  }

  const code = new URLSearchParams(window.location.search).get('code')
  if (code) {
    fetch(
      'https://webdev-api.loftschool.com/github',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          clientId: env.clientId,
          clientSecret: env.clientSecret
        })
      }
    )
      .then(resp => {
        resp.json()
          .then(data => {
            const { token } = data
            sessionStorage.setItem('token', token)
            router.replace({ name: 'root' })
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => { console.log(err) })
  }

  return {
    getCode
  }
}
