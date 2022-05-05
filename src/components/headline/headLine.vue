<template>
  <div class="c-headline">
    <div class="x-container">
      <div class="topline">
        <router-link :to="{ name: 'root' }">
          <h1>Gitogram /</h1>
        </router-link>
        <div class="icons">
          <button
            class="icon__wrapper icon__wrapper--home"
            @click="$router.push({ name: 'following' })">
            <userIcon name="iconHome" />
          </button>
          <button class="icon__wrapper icon__wrapper--photo">
            <userIcon name="iconPhoto" v-if="isUserDataLoading"/>
            <router-link :to="{ name: 'profile' }">
              <img v-bind:src="avatar" alt="user avatar">
            </router-link>
          </button>
          <button @click="logout()" class="icon__wrapper icon__wrapper--logout">
            <userIcon name="iconLogout" />
          </button>

        </div>
      </div>
    <template v-if="withCurrentUser">
      <div v-if="isUserDataLoading">
        <cParagraph :countObj="[
            { width: '300px', height: '20px'},
            { width: '200px', height: '20px'},
            { width: '100px', height: '20px'}
          ]" />
      </div>
      <currentUser v-if="!isUserDataLoading"
        :avatar="avatar"
        :username="username"
        :nickname="nickname"
        :reposts="reposts"
        :repostsLink="repostsLink"
        :watchers="watchers"
        :watchersLink="watchersLink"
      />
    </template>
    <div class="content" v-if="$slots.content">
      <slot name="content" />
    </div>
  </div>
  </div>
</template>

<script>
import { userIcon } from '../../icons'
import { currentUser } from '../currentUser'
import { cParagraph } from '../cParagraph'
import headLine from '../../composable/headLine'

export default {
  name: 'c-headline',
  components: {
    currentUser,
    cParagraph,
    userIcon
  },
  props: {
    withCurrentUser: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const {
      logout,
      avatar,
      reposts,
      username,
      nickname,
      watchers,
      repostsLink,
      watchersLink,
      isUserDataLoading
    } = headLine()

    return {
      logout,
      avatar,
      reposts,
      username,
      nickname,
      watchers,
      repostsLink,
      watchersLink,
      isUserDataLoading
    }
  }
}
</script>

<style lang="scss" src="./headline.scss" scoped></style>
