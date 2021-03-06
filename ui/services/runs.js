import axios from 'axios'
import config from '../config'

export const getRuns = (params) => {
  const url = `/api/runs`
  let defaultParams = {}
  if (params) {
    defaultParams = Object.assign({}, defaultParams, params)
  }
  return axios.get(url, { params: defaultParams })
}

export const getRun = (id) => {
  const url = `/api/runs/${id}`
  return axios.get(url)
}
