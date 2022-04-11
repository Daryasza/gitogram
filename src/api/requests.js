// import axios from 'axios'
//
// const baseURL = 'https://api.github.com'
//
// export const makeRequest = ({
//   url,
//   method = 'get',
//   data = {},
//   headers = {
//     // Authorization: `token ${process.env.VUE_APP_GH_TOKEN}`
//   }
// }) => axios({
//   url,
//   method,
//   data,
//   baseURL,
//   headers
// })

import axios from 'axios'

const baseURL = 'https://api.github.com'

export default async function gateway (uri, method, headers = {}, data = {}) {
  const config = {
    url: uri,
    baseURL: baseURL,
    data: data,
    headers: headers
  }
  // Allowed / implemented methods
  if (method && ['get', 'post'].includes(method.toLowerCase())) {
    config[method] = method.toLowerCase()
  }
  // headers["Authorization"] = `token ${process.env.VUE_APP_GH_TOKEN}`
  return axios(config)
}
