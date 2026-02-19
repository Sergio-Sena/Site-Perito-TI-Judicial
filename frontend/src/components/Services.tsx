import Link from 'next/link'

const services = [
  {
    title: 'Assistência Técnica em Processos Judiciais',
    description: 'Suporte técnico especializado durante todo o processo judicial, auxiliando na compreensão de questões tecnológicas complexas.',
    icon: '⚖️'
  },
  {
    title: 'Elaboração de Parecer Técnico Prévio',
    description: 'Análise técnica preliminar de casos para orientar a estratégia jurídica antes do início do processo.',
    icon: '📋'
  },
  {
    title: 'Análise Crítica de Laudos Periciais',
    description: 'Revisão técnica detalhada de laudos periciais existentes, identificando inconsistências e pontos de contestação.',
    icon: '🔍'
  },
  {
    title: 'Formulação de Quesitos Técnicos',
    description: 'Elaboração de quesitos técnicos precisos e estratégicos para perícias judiciais em processos de TI.',
    icon: '❓'
  },
  {
    title: 'Consultoria em Segurança da Informação',
    description: 'Consultoria especializada em segurança digital para casos envolvendo vazamentos, invasões e proteção de dados.',
    icon: '🔒'
  }
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Serviços Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos serviços técnicos especializados para advogados e escritórios 
            que necessitam de expertise em tecnologia da informação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Link 
                href="/contato"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Solicitar Orçamento →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/servicos"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    </section>
  )
}