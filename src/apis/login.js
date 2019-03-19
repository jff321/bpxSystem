import axios from 'axios'

export function login(data) {
  const  result = axios.post('manage/login', data);
  return result
}
