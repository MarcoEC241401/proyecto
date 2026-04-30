import axios from 'axios'
import type { IAuthResponse } from '../types/user.types'

const BASE = import.meta.env.VITE_API_URL || ''
const API = `${BASE}/api/auth`

export const loginService = async (
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const { data } = await axios.post(`${API}/login`, { email, password })
  return data
}