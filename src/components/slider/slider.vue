<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="header">
          <cProgress />
          <div class="modal-header">
            <userName :avatar="avatar" :username="username" />
          </div>
        </div>
        
        <div class="body--modal">
          <div class="body">
            <div class="image">
              <img :src="avatar" alt="story image">
            </div>
            <div class="text">
              <p>
                <b>The easiest</b> way to get .NET 6 Preview 4 is to install the maui-check dotnet tool from CLI and follow the instructions.
              </p>
              <p>
                For running on Mac you'll currently use your favorite text editor and terminal to edit and run apps. We expect Visual Studio for Mac .NET 6 support to begin arriving mid-year.
              </p>
              <p>In Preview 4 we enable push/pop navigation with NavigationPage. We added a concrete implementation of IWindow, and completed porting ContentPage from Xamarin.Forms</p>
              <p>For running on Mac you'll currently use your favorite text editor and terminal to edit and run apps. We expect Visual Studio for Mac .NET 6 support to begin arriving mid-year.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <cButton>Follow</cButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userName } from '../userName/index'
import { cButton } from '../cButton/index'
import { cProgress } from '../progress/index'

export default {
  name: 'cSlider',
  props: {
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  components: {
    userName,
    cButton,
    cProgress
  }
}
</script>

<style lang="scss" src="./slider.scss" scoped></style>
