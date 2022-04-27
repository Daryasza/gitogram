<template>
  <div class="c-feed">
    <div class="username-wrapper" v-if="withRepoOwner">
      <userName
      :avatar="avatar"
      :username="username" />
    </div>
    <div class="feed-desc-wrapper">
      <slot name="feed-decs" />
    </div>
    <div class="toggler-wrapper">
      <viewToggler @toggle="toggleIssues"/>
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
          <li class="comments__item" v-for="issue in issues" :key="issue.id">
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
import { userName } from '../userName/index'
import { userComment } from '../comment/index'
import { viewToggler } from '../toggler/index'
import { cParagraph } from '../cParagraph/index'
import feed from '../../composable/feed'

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
    },
    withRepoOwner: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const {
      issues,
      isLoading,
      formattedDate,
      toggleIssues,
      visible
    } = feed(props)

    return {
      issues,
      isLoading,
      formattedDate,
      toggleIssues,
      visible
    }
  }
}
</script>

<style lang='scss' src='./feed.scss' scoped></style>
