<template>
  <div class="modal-container" :class="{ 'modal-container-active': active }">
    <div class="header">
      <cProgress :active="active" />
      <cParagraph :count=1 v-if="!avatar && !username" />
      <div class="modal-header" v-if="avatar && username">
        <userName :avatar="avatar" :username="username" />
      </div>
    </div>
    <div class="body--modal">
      <div class="body">
        <cSpinner v-if="isLoading" />
        <cParagraph v-if="!readme && !isLoading"
          :countObj="[
            { width: '200px', height: '30px'},
            { width: '150px', height: '30px'},
            { width: '100px', height: '30px'},
            { width: '200px', height: '30px'},
            { width: '180px', height: '30px'}
          ]"/>
        <div class="text" v-if="readme" v-html="readme">
        </div>
      </div>
    </div>
    <template v-if="active">
      <button
        v-if="btnsShown.includes('next')"
        class="btn btn-next"
        @click="$emit('onNextSlide')"
      >
        <span class="arrow"><userIcon name="iconArrow" /></span>
      </button>
      <button
        v-if="btnsShown.includes('prev')"
        class="btn btn-prev"
        @click="$emit('onPrevSlide')"
      >
        <span class="arrow"><userIcon name="iconArrow" /></span>
      </button>
    </template>
    <div class="modal-footer">
      <cButton
        :theme_color="isFollowed ? 'grey-theme' : undefined"
        @click="followClick()">
        {{ isFollowed ? "Unfollow" : "Follow" }}
      </cButton>
    </div>
  </div>
</template>

<script>

import { cButton } from '../cButton/index'
import { cSpinner } from '../cSpinner/index'
import { userName } from '../userName/index'
import { cProgress } from '../progress/index'
import { cParagraph } from '../cParagraph/index'
import { userIcon } from '../../icons'

export default {
  name: 'cSlider',
  components: {
    cButton,
    cSpinner,
    userName,
    cProgress,
    cParagraph,
    userIcon
  },
  props: {
    idx: {
      type: Number
    },
    active_idx: {
      type: Number
    },
    full_name: {
      type: String
    },
    btnsShown: {
      type: Array,
      default: () => ['prev', 'next'],
      validator (val) {
        return val.every((item) => item === 'next' || item === 'prev')
      }
    }
  },
  emits: ['onPrevSlide', 'onNextSlide'],
  computed: {
    active () {
      return Number(this.idx) === Number(this.active_idx)
    },
    avatar () {
      return this.$store.getters['slider/getAvatar'](Number(this.idx))
    },
    username () {
      return this.$store.getters['slider/getUsername'](Number(this.idx))
    },
    fullName () {
      return this.$store.getters['slider/getFullName'](Number(this.idx))
    },
    isLoading () {
      return this.$store.getters['slider/getLoadStatus'](this.fullName)
    },
    readme () {
      return this.$store.getters['slider/getReadme'](this.fullName)
    },
    isFollowed () {
      return this.$store.getters['user/getRepoStar'](this.full_name)
    }
  },
  methods: {
    followClick () {
      this.$store.dispatch(
        this.isFollowed ? 'user/unstarRepo' : 'user/starRepo',
        this.fullName
      )
    }
  }
}
</script>

<style lang="scss" src="./slider.scss" scoped></style>
