<template>
  <table class="c-feedbackBox">
    <tr>
      <th class="feedbackBox__block feedbackBox__block--btn">
        <span class="block__icon">
          <userIcon name="iconStar"/>
        </span>
        <span class="block__text">Star</span>
      </th>
      <th>
        <div class="feedbackBox__block">
          <span class="block__text">156k</span>
        </div>
      </th>
      <th>
        <button class="feedbackBox__block feedbackBox__block--btn">
          <span class="block__icon">
            <userIcon name="iconFork"/>
          </span>
          <span class="block__text">Fork</span>
        </button>
      </th>
      <th>
        <div class="feedbackBox__block">
          <span class="block__text">4</span>
        </div>
      </th>
    </tr>
  </table>
</template>

<script>
import { userIcon } from '../../icons'

export default {
  components: {
    userIcon
  }
}
</script>

<style lang="sccs" src="./feedbackBox.scss"></style>
