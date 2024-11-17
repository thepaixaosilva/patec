'use client'
import { PiStudentFill } from 'react-icons/pi'
import { IoCalendar } from 'react-icons/io5'
import { GiBookCover } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { FaPenClip } from 'react-icons/fa6'
import { LinkButton } from '@/components/ui/link-button'
import { motion } from 'framer-motion'

// export const metadata = {
//   title: 'Dashboard',
//   icons: {
//     icon: '/favicon.ico',
//   },
// }

export default function Dashboard() {
  // Classe base para os botões com sombras e transições
  const baseButtonClasses = 'flex flex-col items-center justify-center text-white px-6 py-4 rounded-xl size-64 transition-transform duration-300 hover:scale-105 hover:shadow-2xl'

  // Itens do botão com ícones, títulos, e cores específicas
  const buttonItems = [
    {
      href: '/coordinator/manage_answer_keys',
      icon: <FaPenClip className="mb-5 size-28" />,
      label: 'Gabaritos',
      bgColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      href: '/coordinator/manage_students',
      icon: <PiStudentFill className="mb-5 size-28" />,
      label: 'Alunos',
      bgColor: 'bg-green-500 hover:bg-green-600',
    },
    {
      href: '/coordinator/manage_subjects',
      icon: <GiBookCover className="mb-5 size-28" />,
      label: 'Disciplinas',
      bgColor: 'bg-red-500 hover:bg-red-600',
    },
    {
      href: '/coordinator/manage_test_days',
      icon: <IoCalendar className="mb-5 size-28" />,
      label: 'Avaliações',
      bgColor: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      href: '/coordinator/reports',
      icon: <HiOutlineDocumentReport className="mb-5 size-28" />,
      label: 'Relatórios',
      bgColor: 'bg-yellow-500 hover:bg-yellow-600',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
        {buttonItems.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
            <LinkButton href={item.href} className={`${baseButtonClasses} ${item.bgColor}`}>
              {item.icon}
              <h1 className="text-2xl font-semibold text-center mt-3">{item.label}</h1>
            </LinkButton>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
