<template>
  <component :is='name' />
</template>

<script>

import * as userIcons from './options'

export default {
  name: 'Icon',
  components: { ...userIcons },
  props: {
    name: {
      type: String,
      required: true,
      validator (val) {
        return Object.keys(userIcons).includes(val)
      }
    }
  }
}
</script>
