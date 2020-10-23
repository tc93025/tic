import axios from 'axios'

axios.defaults.baseURL = '/bss';

export async function get({ url, data }) {
  return await axios({
    method: 'get',
    url,
    data
  })
}

export function post({ url, data }) {
  return axios({
    method: 'post',
    url,
    data
  })
}
