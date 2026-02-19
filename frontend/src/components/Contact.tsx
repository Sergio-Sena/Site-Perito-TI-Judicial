'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    descricao: '',
    urgencia: 'normal'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar envio do formulário
    console.log('Formulário enviado:', formData)
    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solicite uma Análise do Seu Caso
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preencha o formulário abaixo com os detalhes do seu caso. 
            Retornaremos com uma proposta personalizada em até 24 horas.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-2">
                  Serviço de Interesse *
                </label>
                <select
                  id="servico"
                  name="servico"
                  required
                  value={formData.servico}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Selecione um serviço</option>
                  <option value="assistencia-judicial">Assistência Técnica em Processos Judiciais</option>
                  <option value="parecer-previo">Elaboração de Parecer Técnico Prévio</option>
                  <option value="analise-laudos">Análise Crítica de Laudos Periciais</option>
                  <option value="quesitos-tecnicos">Formulação de Quesitos Técnicos</option>
                  <option value="consultoria-seguranca">Consultoria em Segurança da Informação</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="urgencia" className="block text-sm font-medium text-gray-700 mb-2">
                Urgência do Caso
              </label>
              <select
                id="urgencia"
                name="urgencia"
                value={formData.urgencia}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="normal">Normal (até 15 dias)</option>
                <option value="urgente">Urgente (até 7 dias)</option>
                <option value="emergencial">Emergencial (até 3 dias)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Caso *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                required
                rows={5}
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva brevemente o caso, as questões técnicas envolvidas e o que você precisa..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-primary-700 transition-colors"
            >
              Enviar Solicitação
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}