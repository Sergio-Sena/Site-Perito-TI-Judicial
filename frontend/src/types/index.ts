export interface User {
  id: string
  email: string
  name: string
  phone?: string
  createdAt: string
}

export interface Caso {
  id: string
  usuario_id: string
  servico: string
  descricao: string
  urgencia: 'normal' | 'urgente' | 'emergencial'
  status: 'pendente' | 'em_andamento' | 'concluido' | 'cancelado'
  data_criacao: string
  valor_estimado?: number
  valor_final?: number
}

export interface Documento {
  id: string
  caso_id: string
  usuario_id: string
  nome_arquivo: string
  chave_s3: string
  tipo_arquivo: string
  data_upload: string
  status: 'pendente' | 'processado' | 'erro'
}

export interface ArtigoBlog {
  id: string
  titulo: string
  resumo: string
  conteudo: string
  autor: string
  data_publicacao: string
  tags: string[]
  slug: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}