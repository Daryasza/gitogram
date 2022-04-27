<template>
  <div class="feeds-wrapper">
    <div class="header">
      <headLine>
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
              :stars="starCount(repo.full_name)"
              :forks="repo.forks"
              :starred="isStarred(repo.full_name)"
              :fullName="repo.full_name"
              @onStar="onStar(repo.full_name)"
              @onFork="onFork(repo.full_name)" />
          </div>
        </template>
      </feedItem>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    userAvatarList,
    feedItem,
    feedbackBox
  },
  computed: {
    ...mapGetters({
      trendingRepos: 'feeds/getRepos',
      isLoading: 'feeds/isLoading',
      starredRepos: 'user/getStarredRepos',
      isStarredReposLoading: 'user/getStarredReposLoadStatus',
      avatar: 'user/getAvatar',
      nickname: 'user/getNickname',
      isUserDataLoading: 'user/getUserDataLoadStatus'
    }),
    isStarred () {
      return fullName => this.$store.getters['user/getRepoStar'](fullName)
    },
    starCount () {
      // eslint-disable-next-line
      this.starCountTrigger++
      return fullName => this.$store.getters['user/getRepoStarCount'](fullName)
    }
  },
  data () {
    return {
      starCountTrigger: 0
    }
  },
  methods: {
    ...mapActions({
      loadTrendings: 'feeds/loadTrendings',
      loadStarredRepos: 'user/loadStarredRepos'
    }),
    onStar (fullName) {
      this.$store.dispatch(
        this.isStarred(fullName) ? 'user/unstarRepo' : 'user/starRepo',
        fullName
      )
      this.starCountTrigger++
    },
    onFork (fullName) {
      window.open(
        `https://github.com/${fullName}/fork`,
        '_blank'
      )
    },
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
<style lang='scss' src='../../components/headline/headline.scss'></style>
