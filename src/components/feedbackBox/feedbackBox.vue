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
        <span class="block__text"> {{ stars }} </span>
      </th>
      <th class="feedbackBox__block feedbackBox__block--btn">
        <span class="block__icon block__icon--fork">
          <userIcon name="iconFork"/>
        </span>
        <span class="block__text"> Fork </span>
      </th>
      <th class="feedbackBox__block">
        <span class="block__text"> {{ forks }} </span>
      </th>
    </tr>
  </table>
</template>

<script>
import { userIcon } from '../../icons'

export default {
  components: {
    userIcon
  },
  props: {
    stars: {
      type: String,
      required: true
    },
    forks: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sccs" src="./feedbackBox.scss"></style>
