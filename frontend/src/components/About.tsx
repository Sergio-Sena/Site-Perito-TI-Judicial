import Link from 'next/link'

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Expertise Técnica e Jurídica
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Com mais de 15 anos de experiência em tecnologia da informação e 
              especialização em perícia digital, oferecemos suporte técnico 
              especializado para o meio jurídico.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Certificações AWS e Forense Digital</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Mais de 200 casos analisados</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Especialista em Segurança da Informação</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Formação em Direito Digital</span>
              </div>
            </div>
            <Link 
              href="/sobre"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Conhecer Mais
            </Link>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Por que escolher nossos serviços?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Laudos técnicos precisos e fundamentados
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Linguagem acessível para profissionais do direito
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Prazos rigorosamente cumpridos
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Disponibilidade para esclarecimentos em audiência
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Sigilo absoluto e segurança dos dados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}