import axios from 'axios'

axios.defaults.baseURL = '/bss';

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
