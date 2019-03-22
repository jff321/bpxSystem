import axios from 'axios';

// 盒子列表
export async function boxs(keys, page, limit) {
  const result = await axios.get(`manage/boxs?keys=${keys}&page=${page}&limit=${limit}`);
  return result ? result : false
}

// 新增
export function addBox(data) {
  const result = axios.post(`manage/boxs`, data);
  return result ? result : false
}

// 编辑显示
export async function editBoxShow(boxId) {
  const result = await axios.get(`manage/boxs/${boxId}`);
  return result ? result : false
}

// 编辑提交
export function editBox(boxId, data) {
  const result = axios.put(`manage/boxs/${boxId}`, data);
  return result ? result : false
}

// 删除
export function deleteBox(boxId) {
  const result = axios.delete(`manage/boxs/${boxId}`);
  return result ? result : false
}

// 启用，禁用盒子状态
export async function change(data) {
  const result = axios.post('manage/boxs/enables', data);
  return result ? result : false
}