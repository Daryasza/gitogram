
<template>
  <div class="c-feed">
    <div class="username-wrapper">
      <userName />
    </div>
    <div class="feed-desc-wrapper">
      <slot name="feed-decs"/>
    </div>
    <div class="toggler-wrapper">
      <viewToggler @onToggle="toggleFeed"/>
    </div>
    <div class="comments" v-if="visible">
      <ul class="comments__list">
        <li class="comments__item" v-for="n in 5" :key="n">
          <userComment text="Some Text" username="User Name"/>
        </li>
      </ul>
    </div>
    <!-- <div class="date">
      <span class="date">{{ date }}</span>
    </div> -->
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
