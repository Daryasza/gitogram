<template>
  <div class="profile-wrapper">
    <div class="header">
      <headLine :withCurrentUser="false" />
    </div>
    <div class="profile-content-wrapper">
      <div class="profile-content-currentUser">
        <div class="profile-currentUser-wrapper">
          <h2 class="profile-content-currentUser-title">My profile</h2>
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
      <div class="profile-content-feedItem">
        <div class="profile-feedItem-wrapper">
          <div class="profile-content-feedItem-title">
            <h2>Repositories</h2>
            <h3>{{ userReposCount }}</h3>
          </div>
          <div class="profile-content-feedItem-spinner">
            <div v-if="isUserReposLoading">
              <cSpinner />
            </div>
          </div>
          <template v-if="!isUserReposLoading">
            <feedItem v-for="repo in userRepos"
            :key="repo.id"
            :fullName="repo.full_name"
            :avatar="repo.owner.avatar_url"
            :username="repo.owner.login"
            :date="repo.created_at"
            :withRepoOwner="false"
            >
              <template #feed-decs>
                <div class="feed-desc">
                  <a href="#" class="feed-desc__title">{{ repo.name }}</a>
                  <div class="feed-desc__text">{{ repo.description }}</div>
                  <feedbackBox
                    :stars="starCount(repo.full_name)"
                    :forks="repo.forks"
                    :starred="isStarred(repo.full_name)"
                    :fullName="repo.full_name"
                    :forkDisabled="true"
                    @onStar="onStar(repo.full_name)" />
                </div>
              </template>
            </feedItem>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { feedItem } from '../../components/feed'
import { headLine } from '../../components/headline/index'
import { cSpinner } from '../../components/cSpinner/index'
import { cParagraph } from '../../components/cParagraph/index'
import { currentUser } from '../../components/currentUser/index'
import { feedbackBox } from '../../components/feedbackBox'
import profile from '../../composable/profile'

export default {
  name: 'feeds',
  components: {
    headLine,
    cSpinner,
    cParagraph,
    currentUser,
    feedItem,
    feedbackBox
  },
  setup () {
    const {
      onStar,
      avatar,
      reposts,
      nickname,
      username,
      watchers,
      isStarred,
      starCount,
      userRepos,
      repostsLink,
      watchersLink,
      starredRepos,
      userReposCount,
      isUserDataLoading,
      isUserReposLoading,
      isStarredReposLoading
    } = profile()

    return {
      onStar,
      avatar,
      reposts,
      nickname,
      username,
      watchers,
      isStarred,
      starCount,
      userRepos,
      repostsLink,
      watchersLink,
      starredRepos,
      userReposCount,
      isUserDataLoading,
      isUserReposLoading,
      isStarredReposLoading
    }
  }
}
</script>

<style lang='scss' src='./profile.scss'></style>
