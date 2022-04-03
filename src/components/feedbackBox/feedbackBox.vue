<template>
  <table class="c-feedbackBox">
    <tr class="feedbackBox">
      <th class="feedbackBox__block feedbackBox__block--btn">
        <span class="block__icon block__icon--star">
          <userIcon name="iconStar"/>
        </span>
        <span class="block__text"> Star </span>
      </th>
      <th class="feedbackBox__block">
        <span class="block__text"> {{ formatCount(stars) }} </span>
      </th>
      <th class="feedbackBox__block feedbackBox__block--btn">
        <span class="block__icon block__icon--fork">
          <userIcon name="iconFork"/>
        </span>
        <span class="block__text"> Fork </span>
      </th>
      <th class="feedbackBox__block">
        <span class="block__text"> {{ formatCount(forks) }} </span>
      </th>
    </tr>
  </table>
</template>

<script>
import { userIcon } from '../../icons'

export default {
  name: 'feedbackBox',
  components: {
    userIcon
  },
  methods: {
    formatCount (count) {
      return count >= 1000 ? Math.round(count / 100) / 10 + 'k' : count
    }
  },
  props: {
    stars: {
      type: Number,
      required: true
    },
    forks: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="sccs" src="./feedbackBox.scss"></style>
