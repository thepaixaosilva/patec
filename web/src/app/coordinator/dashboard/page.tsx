'use client'
import { useState } from 'react'
import { PiStudentFill } from 'react-icons/pi'
import { IoCalendar } from 'react-icons/io5'
import { GiBookCover } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { FaPenClip } from 'react-icons/fa6'
import { LinkButton } from '@/components/ui/link-button'
import { motion } from 'framer-motion'
import { IoMdExit } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth'

interface ButtonItem {
  href?: string
  onClick?: () => void
  icon: React.ReactNode
  label: string
  bgColor: string
  description: string
}

export default function Dashboard() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    try {
      logout()
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const baseButtonClasses = 'flex flex-col items-center justify-center text-white px-6 py-4 rounded-xl size-56 transition-transform duration-300 hover:scale-105 hover:shadow-2xl'

  const buttonItems: ButtonItem[] = [
    {
      href: '/coordinator/manage_answer_keys',
      icon: <FaPenClip className="mb-5 size-28" />,
      label: 'Gabaritos',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      description: 'Gerencie os gabaritos das avaliações.',
    },
    {
      href: '/coordinator/manage_students',
      icon: <PiStudentFill className="mb-5 size-28" />,
      label: 'Alunos',
      bgColor: 'bg-green-500 hover:bg-green-600',
      description: 'Visualize e gerencie informações dos alunos.',
    },
    {
      href: '/coordinator/manage_subjects',
      icon: <GiBookCover className="mb-5 size-28" />,
      label: 'Disciplinas',
      bgColor: 'bg-red-500 hover:bg-red-600',
      description: 'Gerencie as disciplinas disponíveis.',
    },
    {
      href: '/coordinator/manage_test_days',
      icon: <IoCalendar className="mb-5 size-28" />,
      label: 'Avaliações',
      bgColor: 'bg-purple-500 hover:bg-purple-600',
      description: 'Agende e gerencie as avaliações.',
    },
    {
      href: '/coordinator/reports',
      icon: <HiOutlineDocumentReport className="mb-5 size-28" />,
      label: 'Relatórios',
      bgColor: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Acesse relatórios detalhados das avaliações.',
    },
    {
      onClick: handleLogout,
      icon: <IoMdExit className="mb-5 size-28" />,
      label: 'Sair',
      bgColor: 'bg-gray-500 hover:bg-gray-600',
      description: 'Fazer logout do sistema.',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
        {buttonItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.onClick ? (
              <button onClick={item.onClick} className={`${baseButtonClasses} ${item.bgColor}`}>
                {item.icon}
                <h1 className="text-2xl font-semibold text-center mt-3">{item.label}</h1>
              </button>
            ) : item.href ? (
              <LinkButton href={item.href} className={`${baseButtonClasses} ${item.bgColor}`}>
                {item.icon}
                <h1 className="text-2xl font-semibold text-center mt-3">{item.label}</h1>
              </LinkButton>
            ) : null}
          </motion.div>
        ))}
      </div>
      <div className="h-12 mt-4 font-extrabold text-center text-gray-700">{hoveredItem !== null && buttonItems[hoveredItem].description}</div>
    </div>
  )
}
