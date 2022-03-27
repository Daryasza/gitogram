
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
          <userComment :text="issue.comment" :username="issue.name"/>
        </li>
      </ul>
    </div>
    <div class="date">
      <span class="date">{{ date }}</span>
    </div>
  </div>
</template>

<script>
import { viewToggler } from '../toggler/index'
import { userComment } from '../comment/index'
import { userName } from '../userName/index'

export default {
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
    }
  }
}
</script>

<style lang='scss' src='./feed.scss' scoped></style>
