import userComment from './comment.vue';

export default {
  title: 'userComment',
  component: { userComment }
}

const template = (args) => ({
  components: { userComment },
  setup() {
    return { args };
  },
  template:`
    <userComment v-bind="args" />
  `
})

export const Default = template.bind({})

Default.args = {
  username: 'Mark',
  text: 'Textttxt lala'
}