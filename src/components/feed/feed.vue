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
      <viewToggler @onToggle="toggleIssues"/>
    </div>
    <div class="comments" v-if="visible">
      <div v-if="isLoading">
        <cParagraph :countObj="[
          { width: '250px', height: '20px'},
          { width: '150px', height: '20px'},
          { width: '120px', height: '20px'}
        ]" />
      </div>
      <div v-if="!isLoading">
        <ul class="comments__list">
          <li class="comments__item" v-for="issue in issues" :key="issue.name">
            <userComment :text="issue.title" :username="issue.user.login"/>
          </li>
        </ul>
        <pre class="no-issues" v-if="!issues || issues.length === 0">There are no issues so far</pre>
      </div>
    </div>
    <div class="date">
      <span class="date">{{ formattedDate }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { userName } from '../userName/index'
import { userComment } from '../comment/index'
import { viewToggler } from '../toggler/index'
import { cParagraph } from '../cParagraph/index'

export default {
  name: 'feed',
  components: {
    viewToggler,
    userComment,
    userName,
    cParagraph
  },
  props: {
    fullName: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
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
  computed: {
    issues () {
      return this.$store.getters['feed/getIssues'](this.fullName)
    },
    isLoading () {
      return this.$store.getters['feed/getLoadStatus'](this.fullName)
    },
    formattedDate () {
      return this.$store.getters['feed/getFormattedDate'](this.date)
    }
  },
  methods: {
    ...mapActions({
      loadIssues: 'feed/loadIssues'
    }),
    toggleIssues (isOpened) {
      if (isOpened && !this.issues) this.loadIssues(this.fullName)
      this.visible = isOpened
    }
  }
}
</script>

<style lang='scss' src='./feed.scss' scoped></style>
