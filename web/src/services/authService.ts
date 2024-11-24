import api from '@/config/api' // ajuste o caminho conforme necessário
import axios from 'axios'

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  token: string
}

export const login = async (data: ILoginRequest): Promise<ILoginResponse> => {
  try {
    const response = await api.post<ILoginResponse>('/auth/login', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erro na autenticação')
      } else if (error.request) {
        throw new Error('Servidor não respondeu')
      }
    }
    throw new Error('Erro inesperado durante o login')
  }
}
