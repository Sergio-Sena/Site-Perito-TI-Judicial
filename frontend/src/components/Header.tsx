'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-700">
              Perito TI Judicial
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Início
            </Link>
            <Link href="/servicos" className="text-gray-700 hover:text-primary-600">
              Serviços
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary-600">
              Sobre
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600">
              Blog
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-primary-600">
              Contato
            </Link>
            <Link 
              href="/portal" 
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Portal do Cliente
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-gray-700">Início</Link>
              <Link href="/servicos" className="block px-3 py-2 text-gray-700">Serviços</Link>
              <Link href="/sobre" className="block px-3 py-2 text-gray-700">Sobre</Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700">Blog</Link>
              <Link href="/contato" className="block px-3 py-2 text-gray-700">Contato</Link>
              <Link href="/portal" className="block px-3 py-2 text-primary-600">Portal do Cliente</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}