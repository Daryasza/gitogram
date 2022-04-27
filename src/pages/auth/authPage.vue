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
import auth from '../../composable/auth'

export default {
  name: 'authPage',
  components: {
    userIcon
  },
  setup () {
    const { getCode } = auth()

    return {
      getCode
    }
  }
}
</script>

<style lang="scss" src="./authPage.scss" scoped></style>
