import cSpinner from './cSpinner.vue';

export default {
  title: 'cSpinner',
  component: cSpinner,
}

const template = () => ({
  components: { cSpinner },
  template: '<cSpinner />'
})

export const Default = template.bind({})
