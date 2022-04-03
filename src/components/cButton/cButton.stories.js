import cButton from './cButton.vue';

export default {
  title: 'cButton',
  component: cButton
}

const template = args => ({
  components: { cButton },
  setup() {
    return { args };
  },
  template: `<cButton>{{args.buttonText}}</cButton>`
})

export const Default = template.bind({})

Default.args = {
  buttonText: 'Follow'
}



