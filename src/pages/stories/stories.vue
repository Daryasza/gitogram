<template>
  <div class="stories-wrapper">
    <div class="stories-header">
      <button class="logo-button" @click="$router.replace({name: 'root'})">
        Gitogram /
      </button>
      <button class="close-button" @click="$router.replace({name: 'root'})" />
    </div>
    <div class="stories-body-wrapper">
      <div class="stories-body" :style="sliderShift">
        <cSlider
          v-for="(repo, i) in repos"
          :key="i"
          :idx="i"
          :fullNameProp="repo.full_name"
          :activeIdx="idxLocalComputed"
          :btnsShown="activeBtns"
          @onNextSlide="moveSlider(1)"
          @onPrevSlide="moveSlider(-1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { cSlider } from '../../components/slider/index'
import stories from '../../composable/stories'

export default {
  name: 'stories',
  props: ['idx'],
  components: {
    cSlider
  },
  setup (props) {
    const {
      repos,
      idxLocal,
      activeBtns,
      moveSlider,
      sliderShift,
      idxLocalComputed
    } = stories(props)

    return {
      repos,
      idxLocal,
      activeBtns,
      moveSlider,
      sliderShift,
      idxLocalComputed
    }
  }
}
</script>

<style lang='scss' src='./stories.scss'></style>
