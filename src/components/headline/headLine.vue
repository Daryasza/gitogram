<template>
  <div class="c-headline">
    <div class="x-container">
      <div class="topline">
      <slot name="topline" />
    </div>
    <div v-if="isUserDataLoading">
      <cParagraph :countObj="[
          { width: '200px', height: '60px'}
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
    <div class="content" v-if="$slots.content">
      <slot name="content" />
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { currentUser } from '../currentUser'
import { cParagraph } from '../cParagraph'

export default {
  name: 'c-headline',
  components: {
    currentUser,
    cParagraph
  },
  computed: {
    ...mapGetters({
      avatar: 'user/getAvatar',
      username: 'user/getUsername',
      nickname: 'user/getNickname',
      reposts: 'user/getReposts',
      repostsLink: 'user/getRepostsLink',
      watchers: 'user/getWatchers',
      watchersLink: 'user/getWatchersLink',
      isUserDataLoading: 'user/getUserDataLoadStatus'
    })
  },
  methods: {
    ...mapActions({
      loadUserData: 'user/loadUserData'
    })
  },
  created () {
    this.loadUserData()
  }
}
</script>

<style lang="scss" src="./headline.scss" scoped></style>
