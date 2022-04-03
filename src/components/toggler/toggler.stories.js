import xToggler from './toggler.vue';

export default {
  title: 'xToggler',
  component: xToggler,
}

const template = () => ({
  components: { xToggler },
  template:`
    <xToggler/>
  `
})

export const Default = template.bind({})