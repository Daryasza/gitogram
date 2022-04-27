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
      <cButton class="modal-footer-button"
        theme_color="grey-theme"
        v-if="starLoading">
        <cSpinner size="18px" color="#fff"/>
      </cButton>
      <cButton class="modal-footer-button"
        :theme_color="isFollowed ? 'grey-theme' : undefined"
        @click="followClick()"
        v-if="!starLoading">
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

import { computed } from 'vue'
import slider from '../../composable/slider'

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
  emits: ['onPrevSlide', 'onNextSlide'],
  props: {
    idx: {
      type: Number
    },
    activeIdx: {
      type: Number
    },
    fullNameProp: {
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
  setup (props) {
    const {
      avatar,
      readme,
      username,
      fullName,
      isLoading,
      isFollowed,
      followClick,
      starLoading
    } = slider(props)

    const active = computed(() => {
      return Number(props.idx) === Number(props.activeIdx)
    })

    return {
      active,
      avatar,
      readme,
      username,
      fullName,
      isLoading,
      isFollowed,
      followClick,
      starLoading
    }
  }
}
</script>

<style lang="scss" src="./slider.scss" scoped></style>
