import axios from 'axios'
import { ApiResponse, Caso, Documento } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const authApi = {
  cadastro: async (dados: { nome: string; email: string; password: string }) => {
    const response = await api.post('/auth/cadastro', dados)
    return response.data
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  }
}

// Casos
export const casosApi = {
  submeter: async (caso: Omit<Caso, 'id' | 'usuario_id' | 'data_criacao' | 'status'>): Promise<ApiResponse<{ caso_id: string }>> => {
    const response = await api.post('/casos/submeter', caso)
    return response.data
  },
  
  listar: async (): Promise<ApiResponse<Caso[]>> => {
    const response = await api.get('/casos')
    return response.data
  },
  
  obter: async (id: string): Promise<ApiResponse<Caso>> => {
    const response = await api.get(`/casos/${id}`)
    return response.data
  }
}

// Documentos
export const documentosApi = {
  gerarUrlUpload: async (dados: { caso_id: string; nome_arquivo: string; tipo_arquivo: string }): Promise<ApiResponse<{ upload_url: string; documento_id: string }>> => {
    const response = await api.post('/documentos/upload-url', dados)
    return response.data
  },
  
  listar: async (caso_id: string): Promise<ApiResponse<Documento[]>> => {
    const response = await api.get(`/documentos/caso/${caso_id}`)
    return response.data
  }
}

// Pagamentos
export const pagamentosApi = {
  iniciarStripe: async (dados: { caso_id: string; valor: number; descricao?: string }): Promise<ApiResponse<{ checkout_url: string; session_id: string }>> => {
    const response = await api.post('/pagamentos/iniciar', dados)
    return response.data
  }
}

export default api