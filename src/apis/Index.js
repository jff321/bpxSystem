import axios from 'axios'

export async function test() {
  const  result = axios.get('api/manager/passenger_trait/1')
  return result
}