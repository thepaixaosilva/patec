import axios from 'axios'
import { toaster } from '@/components/ui/toaster' // Importando o toaster do Chakra UI

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config
    console.log('originalRequest  -> ' + originalRequest)

    // Tratamento de erro 401 (não autorizado)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      // Usando o toaster do Chakra UI
      toaster.error({
        title: 'Sessão expirada',
        description: 'Faça login novamente.',
      })
    }

    // Tratamento de erro 403 (proibido)
    if (error.response?.status === 403) {
      toaster.error({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar este recurso.',
      })
    }

    // Tratamento de erro de conexão
    if (error.message === 'Network Error') {
      toaster.error({
        title: 'Erro de conexão',
        description: 'Verifique sua internet.',
      })
    }

    return Promise.reject(error)
  }
)

export default api
