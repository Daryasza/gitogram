import axios from 'axios'

const baseURL = 'https://api.github.com'

export const makeRequest = ({
  url,
  method = 'get',
  data = {},
  headers = {
    Authorization: `token ${process.env.VUE_APP_GH_TOKEN}`
  }
}) => axios({
  url,
  method,
  data,
  baseURL,
  headers
})
