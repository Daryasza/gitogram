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
          :full_name="repo.full_name"
          :active_idx="this.idx_local"
          :btnsShown="activeBtns"
          @onNextSlide="moveSlider(1)"
          @onPrevSlide="moveSlider(-1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { cSlider } from '../../components/slider/index'

export default {
  name: 'stories',
  props: ['idx'],
  components: {
    cSlider
  },
  data () {
    return {
      idx_local: Number(this.idx)
    }
  },
  computed: {
    ...mapGetters({
      repos: 'feeds/getRepos'
    }),
    sliderShift () {
      return `transform: translateX(${this.idx_local ? this.idx_local * -340 : 0}px)`
    },
    activeBtns () {
      if (this.idx_local === 0) return ['next']
      if (this.idx_local === this.repos.length - 1) return ['prev']
      return ['next', 'prev']
    }
  },
  methods: {
    ...mapActions({
      loadTrendings: 'feeds/loadTrendings',
      loadReadme: 'slider/loadReadme'
    }),
    moveSlider (val = 0) {
      this.idx_local = Number(this.idx_local) + val
      const fullName = this.$store.getters['slider/getFullName'](Number(this.idx_local))
      const readme = this.$store.getters['slider/getReadme'](fullName)
      if (!readme) this.loadReadme(fullName)
    }
  },
  created () {
    if (this.idx) this.moveSlider()
    // Kind of cratch to show stories when root page was not loaded (when repos were not loaded)
    if (!this.repos.length) this.loadTrendings()
  }
}
</script>

<style lang='scss' src='./stories.scss'></style>
