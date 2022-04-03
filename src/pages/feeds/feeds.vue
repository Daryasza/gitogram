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
            <li class="users__item" v-for="user in users" :key="user.id">
              <userAvatarList :avatar='user.avatar' :username='user.username' v-on:onAvatarClick="handleAvatarClick(user.id)"/>
            </li>
          </ul>
        </template>
      </headLine>
    </div>
    <div v-if="!isLoaded">
      Loading...
    </div>
    <div class="feedItem-wrapper" v-if="isLoaded">
      <feedItem v-for="item in items"
      :key="item.id"
      :avatar="item.owner.avatar_url"
      :username="item.owner.login"
      :issues="issues[item.full_name]"
      :date="item.created_at"
      >
        <template #feed-decs>
          <div class="feed-desc">
            <a href="#" class="feed-desc__title">{{ item.name }}</a>
            <div class="feed-desc__text">{{ item.description }}</div>
            <feedbackBox :stars="item.stargazers_count" :forks="item.forks"/>
          </div>
        </template>
      </feedItem>
    </div>
  </div>
</template>

<script>
import { headLine } from '../../components/headline/index'
import { userIcon } from '../../icons'
import { userAvatarList } from '../../components/userAvatarList/index'
import users from './data.json'
import { feedItem } from '../../components/feed'
import { feedbackBox } from '../../components/feedbackBox'
import * as api from '../../api/rest'

export default {
  name: 'feeds',
  components: {
    headLine,
    userIcon,
    userAvatarList,
    feedItem,
    feedbackBox
  },
  data () {
    return {
      users,
      items: [],
      isLoaded: false
    }
  },
  methods: {
    handleAvatarClick () {
      console.log('avatar click')
    }
  },
  async created () {
    try {
      const data = await api.trendings.getTrendings()
      this.items = data.data.items

      const promisArray = []
      for (const repo of data.data.items) {
        promisArray.push(api.repos.getIssues(repo.full_name))
      }

      Promise.all(promisArray).then((dataArray) => {
        this.issues = {}
        for (const data of dataArray) {
          this.issues[
            data.request.responseURL
              .replace('https://api.github.com/repos/', '')
              .replace(/\/issues.*/, '')
          ] = data.data.length ? data.data : []
        }
        this.isLoaded = true
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang='scss' src='./feeds.scss'></style>
