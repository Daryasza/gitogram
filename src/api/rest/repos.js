import { makeRequest } from '../requests'

export const getIssues = (fullName) => {
  return makeRequest({
    url: `/repos/${fullName}/issues`
  })
}
