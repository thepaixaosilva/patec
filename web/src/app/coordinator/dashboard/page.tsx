import { PiStudentFill } from 'react-icons/pi'
import { IoCalendar } from 'react-icons/io5'
import { GiBookCover } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { FaPenClip } from 'react-icons/fa6'
import { LinkButton } from '@/components/ui/link-button'

export const metadata = {
  title: 'Dashboard',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function Dashboard() {
  // Classe base para os botões
  const baseButtonClasses = 'flex flex-col items-center justify-center text-white px-4 py-2 rounded size-64 transition-transform duration-200 hover:scale-105'

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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        {buttonItems.map((item, index) => (
          <LinkButton key={index} href={item.href} className={`${baseButtonClasses} ${item.bgColor}`}>
            {item.icon}
            <h1 className="text-3xl font-semibold">{item.label}</h1>
          </LinkButton>
        ))}
      </div>
    </div>
  )
}
