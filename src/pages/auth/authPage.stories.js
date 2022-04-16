import authPage from './authPage.vue';

export default {
  title: 'authPage',
  component: authPage,
}

const template = () => ({
  components: { authPage },
  template: '<authPage />'
})

export const Default = template.bind({})