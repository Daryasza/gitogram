import headLine from './headLine.vue';

export default {
  title: 'headLine',
  component: headLine,
}

const template = () => ({
  components: { headLine },
  template: '<headLine />'
})

export const Default = template.bind({})