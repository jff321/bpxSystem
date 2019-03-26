import axios from 'axios'

// 登录
export function login(data) {
  const  result = axios.post('manage/login', data);
  return result
}

// 退出登录
export function logout(data) {
  const  result = axios.post('manage/logout', data);
  return result
}


