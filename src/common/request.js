import axios from 'axios'

export function get({ url, data }) {
  axios({
    method: 'get',
    url,
    data
  })
}

export function post({ url, data }) {
  axios({
    method: 'post',
    url,
    data
  })
}
