import React from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
}

interface HeaderProps {
  logo?: string
  userType?: string // Adicione uma propriedade para o tipo de usuário
  className?: string
}

const Navbar: React.FC<HeaderProps> = ({ logo = 'Logo', userType = 'default', className = '' }) => {
  // Defina itens de navegação diferentes para cada tipo de usuário
  const navItems: NavItem[] =
    userType === 'admin'
      ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Gerenciar Usuários', href: '/usuarios' },
          { label: 'Configurações', href: '/configuracoes' },
        ]
      : userType === 'user'
      ? [
          { label: 'Início', href: '/' },
          { label: 'Perfil', href: '/perfil' },
          { label: 'Configurações', href: '/configuracoes' },
        ]
      : [
          { label: 'Início', href: '/' },
          { label: 'Sobre', href: '/sobre' },
          { label: 'Serviços', href: '/servicos' },
          { label: 'Contato', href: '/contato' },
        ]

  return (
    <header className={`bg-white shadow-md ${className}`.trim()}>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-800">
              <img src="/../favicon.ico" className="size-10" />
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
