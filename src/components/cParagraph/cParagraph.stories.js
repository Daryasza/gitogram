import cParagraph from './cParagraph.vue';

export default {
  title: 'cParagraph',
  component: cParagraph,
}

const template = (args) => ({
  components: { cParagraph },
  setup() {
    return { args };
  },
  template:'<cParagraph v-bind="args"/>'
})

export const Default = template.bind({})
Default.args = {
  count: 2
}
