
<template>
  <div class="c-feed">
    <div class="username-wrapper">
      <userName
      :avatar="avatar"
      :username="username" />
    </div>
    <div class="feed-desc-wrapper">
      <slot name="feed-decs" />
    </div>
    <div class="toggler-wrapper">
      <viewToggler @onToggle="toggleFeed"/>
    </div>
    <div class="comments" v-if="visible">
      <ul class="comments__list">
        <li class="comments__item" v-for="issue in issues" :key="issue.name">
          <userComment :text="issue.title" :username="issue.user.login"/>
        </li>
      </ul>
    </div>
    <div class="date">
      <span class="date">{{ formatDate(date) }}</span>
    </div>
  </div>
</template>

<script>
import { viewToggler } from '../toggler/index'
import { userComment } from '../comment/index'
import { userName } from '../userName/index'

export default {
  name: 'feed',
  components: {
    viewToggler,
    userComment,
    userName
  },
  props: {
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    issues: {
      type: Array,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    toggleFeed (isOpened) {
      this.visible = isOpened
    },
    formatDate (datetime) {
      const monthNames = {
        1: 'JAN',
        2: 'FEB',
        3: 'MAR',
        4: 'APR',
        5: 'MAY',
        6: 'JUN',
        7: 'JUL',
        8: 'AUG',
        9: 'SEP',
        10: 'OCT',
        11: 'NOV',
        12: 'DEC'
      }
      const date = datetime.replace(/T.*Z/, '')

      const month = date[0] ? parseInt(date.substr(6, 2)) : parseInt(date.substr(5, 2))
      const day = date[0] ? parseInt(date.substr(8, 2)) : parseInt(date.substr(7, 2))

      return `${day} ${monthNames[month]}`
    }
  }
}
</script>

<style lang='scss' src='./feed.scss' scoped></style>
