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
    <div class="feedItem-wrapper">
      <feedItem v-for="user_feed in usersFeed"
      :key="user_feed.id"
      :avatar="user_feed.avatar"
      :username="user_feed.username"
      :issues="user_feed.issues"
      :date="user_feed.date"
      >
        <template #feed-decs>
          <div class="feed-desc">
            <a href="#" class="feed-desc__title">{{ user_feed.title }}</a>
            <div class="feed-desc__text">{{ user_feed.text }}</div>
            <feedbackBox :stars="user_feed.stars" :forks="user_feed.forks"/>
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
import usersFeed from './data_feed.json'
import { feedbackBox } from '../../components/feedbackBox'

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
      usersFeed
    }
  },
  methods: {
    handleAvatarClick () {
      console.log('avatar click')
    }
  }
}
</script>

<style lang='scss' src='./feeds.scss'></style>
