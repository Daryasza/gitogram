<template>
  <div class="user">
    <div class="user__avatar">
      <img v-bind:src="avatar" alt="user avatar" class="avatar-img">
    </div>
    <div class="user__info">
      <div class="user__username">{{ username }}</div>
      <ul class="user__list">
        <li class="user__item info info--reposts">
          <span class="info__number">{{ reposts }} </span>
          <a :href="repostsLink" target="_blank" class="info__link">reposts</a>
        </li>
        <li class="user__item info info--watchers">
          <span class="info__number">{{ watchers }} </span>
          <a :href="watchersLink" target="_blank" class="info__link">watchers</a>
        </li>
      </ul>
      <div class="user__nick">{{ nickname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'currentUser',
  props: {
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    reposts: {
      type: Number,
      required: true
    },
    repostsLink: {
      type: String,
      required: true
    },
    watchers: {
      type: Number,
      required: true
    },
    watchersLink: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped src="./currentUser.scss"></style>
