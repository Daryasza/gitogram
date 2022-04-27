<template>
  <div class="following-wrapper">
    <div class="header">
      <headLine :withCurrentUser="false" />
    </div>
    <div class="following-content-wrapper">
      <div class="following-content-currentUser">
        <div class="following-currentUser-wrapper">
          <h2 class="following-content-currentUser-title">My profile</h2>
          <div v-if="isUserDataLoading">
            <cParagraph :countObj="[
                { width: '200px', height: '60px'}
              ]" />
          </div>
          <currentUser v-if="!isUserDataLoading"
            :avatar="avatar"
            :username="username"
            :nickname="nickname"
            :reposts="reposts"
            :repostsLink="repostsLink"
            :watchers="watchers"
            :watchersLink="watchersLink"
          />
        </div>
      </div>
      <div class="following-content-follow">
        <div class="following-content-follow-title">
          <h2>Following</h2>
          <h3>{{ followCount }}</h3>
        </div>
        <div class="following-content-follow-spinner">
          <cSpinner v-if="isFollowDataLoading" />
        </div>
        <div class="following-content-follow-body" v-if="!isFollowDataLoading">
          <ul>
            <div class="following-follow-row" v-for="item in objectFollow" :key="item.id">
              <li>
                <div class="following-follow-row-object">
                  <div class="following-user__avatar">
                    <img v-bind:src="item.avatar_url" alt="following-user following-avatar" class="following-avatar-img">
                  </div>
                  <div class="following-user__info">
                    <div class="following-user__login">{{ item.login }}</div>
                    <div class="following-user__type">{{ item.type.toLowerCase() }}</div>
                  </div>
                </div>
                <cButton class="following-item-button"
                  :theme_color="!isFollowObjectLoading(item.login) ? objectFollowMap(item.login) ? 'green-theme' : 'grey-theme' : 'grey-theme'"
                  @click="onFollow(item.login)">
                  {{ !isFollowObjectLoading(item.login) ? objectFollowMap(item.login) ? "following" : "follow" : "" }}
                  <cSpinner v-if="isFollowObjectLoading(item.login)" size="18px" color="#fff"/>
                </cButton>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { headLine } from '../../components/headline/index'
import { cSpinner } from '../../components/cSpinner/index'
import { cButton } from '../../components/cButton/index'
import { cParagraph } from '../../components/cParagraph/index'
import { currentUser } from '../../components/currentUser/index'
import following from '../../composable/following'

export default {
  name: 'feeds',
  components: {
    headLine,
    cSpinner,
    cButton,
    cParagraph,
    currentUser
  },
  setup () {
    const {
      avatar,
      reposts,
      nickname,
      username,
      watchers,
      onFollow,
      followCount,
      repostsLink,
      watchersLink,
      objectFollow,
      objectFollowMap,
      isUserDataLoading,
      isFollowDataLoading,
      isFollowObjectLoading
    } = following()

    return {
      avatar,
      reposts,
      nickname,
      username,
      watchers,
      onFollow,
      followCount,
      repostsLink,
      watchersLink,
      objectFollow,
      objectFollowMap,
      isUserDataLoading,
      isFollowDataLoading,
      isFollowObjectLoading
    }
  }
}
</script>

<style lang='scss' src='./following.scss'></style>
<style lang='scss' src='../../components/currentUser/currentUser.scss'></style>
