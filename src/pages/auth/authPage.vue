<template>
  <div class="auth--wrapper">
    <div class="main">
      <div class="main__left auth">
        <h1 class="auth__title">Gitogram /</h1>
        <div class="auth__text">More than just one repository. This is our digital world.</div>
        <button @click="getCode" class="auth__btn">Authorize with github <userIcon name="iconGitHub"/></button>
      </div>
      <div class="main__rigth">
        <userIcon name="iconMac"/>
      </div>
    </div>
    <footer class="footer">
      <div class="footer__text">
        © Gitogram from Loftschool
      </div>
    </footer>
  </div>
</template>

<script>
import { userIcon } from '../../icons'
import env from '../../../env'

export default {
  name: 'authPage',
  components: {
    userIcon
  },
  methods: {
    async getCode () {
      const githubAuthApi = 'https://github.com/login/oauth/authorize'
      const params = new URLSearchParams()

      params.append('client_id', env.clientId)
      params.append('scope', 'repo:status read:user public_repo')

      window.location.href = `${githubAuthApi}?${params}`
    }
  },
  async created () {
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      try {
        const response = await fetch('https://webdev-api.loftschool.com/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clientId: env.clientId, code, clientSecret: env.clientSecret
          })
        })

        const { token } = await response.json()
        sessionStorage.setItem('token', token)
        this.$router.replace({ name: 'root' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" src="./authPage.scss" scoped></style>
