import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const services = [
  {
    title: 'Assistência Técnica em Processos Judiciais',
    description: 'Suporte técnico especializado durante todo o processo judicial, auxiliando na compreensão de questões tecnológicas complexas.',
    details: [
      'Acompanhamento técnico em audiências',
      'Esclarecimentos sobre tecnologia para juízes e advogados',
      'Análise de evidências digitais',
      'Suporte na formulação de estratégias técnicas'
    ],
    price: 'A partir de R$ 2.500',
    icon: '⚖️'
  },
  {
    title: 'Elaboração de Parecer Técnico Prévio',
    description: 'Análise técnica preliminar de casos para orientar a estratégia jurídica antes do início do processo.',
    details: [
      'Análise de viabilidade técnica do caso',
      'Identificação de pontos fortes e fracos',
      'Recomendações estratégicas',
      'Estimativa de custos e prazos'
    ],
    price: 'A partir de R$ 1.800',
    icon: '📋'
  },
  {
    title: 'Análise Crítica de Laudos Periciais',
    description: 'Revisão técnica detalhada de laudos periciais existentes, identificando inconsistências e pontos de contestação.',
    details: [
      'Revisão metodológica do laudo',
      'Identificação de falhas técnicas',
      'Análise de conclusões',
      'Relatório de inconsistências'
    ],
    price: 'A partir de R$ 2.200',
    icon: '🔍'
  },
  {
    title: 'Formulação de Quesitos Técnicos',
    description: 'Elaboração de quesitos técnicos precisos e estratégicos para perícias judiciais em processos de TI.',
    details: [
      'Quesitos específicos por área técnica',
      'Estratégia de questionamento',
      'Antecipação de respostas',
      'Quesitos complementares'
    ],
    price: 'A partir de R$ 800',
    icon: '❓'
  },
  {
    title: 'Consultoria em Segurança da Informação',
    description: 'Consultoria especializada em segurança digital para casos envolvendo vazamentos, invasões e proteção de dados.',
    details: [
      'Análise de incidentes de segurança',
      'Investigação de vazamentos de dados',
      'Auditoria de sistemas',
      'Conformidade com LGPD'
    ],
    price: 'A partir de R$ 3.500',
    icon: '🔒'
  },
  {
    title: 'Perícia em Sistemas e Aplicações',
    description: 'Análise técnica detalhada de sistemas, aplicações e infraestrutura de TI.',
    details: [
      'Análise de código-fonte',
      'Auditoria de banco de dados',
      'Análise de logs de sistema',
      'Investigação de falhas'
    ],
    price: 'A partir de R$ 4.000',
    icon: '💻'
  }
]

export default function ServicosPage() {
  return (
    <div>
      <Header />
      
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Serviços Especializados
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços técnicos especializados 
              para advogados e escritórios que necessitam de expertise em tecnologia da informação.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">{service.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="text-primary-600 font-semibold text-lg mb-4">
                      {service.price}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">O que inclui:</h4>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href="/contato"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Solicitar Orçamento
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-primary-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              Precisa de um Serviço Personalizado?
            </h2>
            <p className="text-primary-700 mb-6">
              Cada caso é único. Entre em contato para discutirmos suas necessidades específicas 
              e elaborarmos uma proposta personalizada.
            </p>
            <Link 
              href="/contato"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Falar com Especialista
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}