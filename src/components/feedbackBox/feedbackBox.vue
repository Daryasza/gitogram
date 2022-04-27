<template>
  <table class="c-feedbackBox">
    <tr class="feedbackBox">
      <th class="feedbackBox__block feedbackBox__block--btn" @click="$emit('onStar')">
        <button class="feedbackBox__btn">
          <span class="block__icon block__icon--star">
            <userIcon :name="starred ? 'iconStarred' : 'iconStar'"/>
          </span>
          <span class="block__text"> {{ starred ? "Starred" : "Star" }} </span>
        </button>
      </th>
      <th class="feedbackBox__block">
        <span class="block__text"> {{ formatCount(cStars) }} </span>
      </th>
      <th class="feedbackBox__block feedbackBox__block--btn"
        :class="forkDisabled ? 'disabled__cell': ''"
        @click="forkDisabled ? null : $emit('onFork')">
        <button class="feedbackBox__btn" :disabled="forkDisabled ? true : false">
          <span class="block__icon block__icon--fork">
            <userIcon name="iconFork"/>
          </span>
          <span class="block__text"
            :class="forkDisabled ? 'disabled__cell': ''"
          > Fork </span>
        </button>
      </th>
      <th class="feedbackBox__block"
        :class="forkDisabled ? 'disabled__cell': ''"
      >
        <span class="block__text"> {{ formatCount(forks) }} </span>
      </th>
    </tr>
  </table>
</template>

<script>
import { userIcon } from '../../icons'
import feedbackBox from '../../composable/feedbackBox'

export default {
  name: 'feedbackBox',
  components: {
    userIcon
  },
  emits: ['onStar', 'onFork'],
  props: {
    stars: {
      type: Number,
      required: true
    },
    starred: {
      type: Boolean,
      default: true
    },
    forks: {
      type: Number,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    forkDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const {
      cStars,
      formatCount,
      starLoading
    } = feedbackBox(props)

    return {
      cStars,
      formatCount,
      starLoading
    }
  }
}
</script>

<style lang="sccs" src="./feedbackBox.scss"></style>
