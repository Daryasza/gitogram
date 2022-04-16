<template>
  <div class="feeds-wrapper">
    <div class="header">
      <headLine>
        <template #topline>
          <h1>Gitogram /</h1>
          <div class="icons">
            <button class="icon__wrapper icon__wrapper--home">
              <userIcon name="iconHome" />
            </button>
            <button class="icon__wrapper icon__wrapper--photo">
              <userIcon name="iconPhoto" />
            </button>
            <button class="icon__wrapper icon__wrapper--logout ">
              <userIcon name="iconLogout" />
            </button>

          </div>
        </template>
        <template #content>
          <ul class="users">
            <li class="users__item" v-for="(repo, idx) in trendingRepos" :key="repo.id">
              <userAvatarList
                :avatar='repo.owner.avatar_url'
                :username='repo.owner.login'
                v-on:onAvatarClick="$router.push({
                    name: 'stories',
                    params: { idx: idx }
                  })"/>
            </li>
          </ul>
        </template>
      </headLine>
    </div>
    <div v-if="isStarredReposLoading">
      <cSpinner />
    </div>
    <div class="feedItem-wrapper" v-if="!isStarredReposLoading">
      <feedItem v-for="repo in starredRepos"
      :key="repo.id"
      :fullName="repo.full_name"
      :avatar="repo.owner.avatar_url"
      :username="repo.owner.login"
      :date="repo.created_at"
      >
        <template #feed-decs>
          <div class="feed-desc">
            <a href="#" class="feed-desc__title">{{ repo.name }}</a>
            <div class="feed-desc__text">{{ repo.description }}</div>
            <feedbackBox
              :stars="repo.stargazers_count"
              :forks="repo.forks" />
          </div>
        </template>
      </feedItem>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { userIcon } from '../../icons'
import { feedItem } from '../../components/feed'
import { headLine } from '../../components/headline/index'
import { cSpinner } from '../../components/cSpinner/index'
import { feedbackBox } from '../../components/feedbackBox'
import { userAvatarList } from '../../components/userAvatarList/index'

export default {
  name: 'feeds',
  components: {
    headLine,
    cSpinner,
    userIcon,
    userAvatarList,
    feedItem,
    feedbackBox
  },
  computed: {
    ...mapState({
      starredRepos: state => state.user.starredRepos,
      isStarredReposLoading: state => state.user.starredReposLoadStatus
    }),
    ...mapGetters({
      trendingRepos: 'feeds/getRepos',
      isLoading: 'feeds/isLoading'
    }),
    isStarred (fullName) {
      return this.$state.getters['user/getRepoStar'](fullName)
    }
  },
  methods: {
    ...mapActions({
      loadTrendings: 'feeds/loadTrendings',
      loadStarredRepos: 'user/loadStarredRepos'
    }),
    async getUser () {
      try {
        const res = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${sessionStorage.getItem('token')}`
          }
        })
        await res.json()
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    try {
      this.loadTrendings()
      this.loadStarredRepos()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang='scss' src='./feeds.scss'></style>
