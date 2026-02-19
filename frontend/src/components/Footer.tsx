import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Perito TI Judicial</h3>
            <p className="text-gray-300 mb-4">
              Especialista em perícia técnica digital para processos judiciais.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 contato@peritoti.com.br</p>
              <p>📱 (11) 99999-9999</p>
              <p>📍 São Paulo, SP</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/servicos" className="hover:text-white">Assistência Judicial</Link></li>
              <li><Link href="/servicos" className="hover:text-white">Parecer Técnico</Link></li>
              <li><Link href="/servicos" className="hover:text-white">Análise de Laudos</Link></li>
              <li><Link href="/servicos" className="hover:text-white">Quesitos Técnicos</Link></li>
              <li><Link href="/servicos" className="hover:text-white">Consultoria</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/sobre" className="hover:text-white">Sobre o Perito</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
              <li><Link href="/portal" className="hover:text-white">Portal do Cliente</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Certificações</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>🏆 AWS Certified Solutions Architect</li>
              <li>🔒 Certified Ethical Hacker (CEH)</li>
              <li>⚖️ Perito Judicial Credenciado</li>
              <li>🛡️ ISO 27001 Lead Auditor</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Perito TI Judicial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}