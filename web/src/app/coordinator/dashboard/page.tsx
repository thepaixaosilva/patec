import { PiStudentFill } from 'react-icons/pi'
import { IoCalendar } from 'react-icons/io5'
import { GiBookCover } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { FaPenClip } from 'react-icons/fa6'
import { LinkButton } from '@/components/ui/link-button'

export default function Dashboard() {
  const baseButtonClasses =
    'flex flex-col items-center justify-center bg-blue-500 text-white px-4 py-2 rounded w-96 h-96 transition-transform duration-200 hover:scale-105 hover:bg-blue-600'

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        <LinkButton href="/coordinator/manage_answer_keys" className={baseButtonClasses}>
          <FaPenClip size={100} />
          <h1>Gabaritos</h1>
        </LinkButton>
        <LinkButton href="/coordinator/manage_students" className={baseButtonClasses}>
          <PiStudentFill size={32} />
          <h1>Alunos</h1>
        </LinkButton>
        <LinkButton href="/coordinator/manage_subjects" className={baseButtonClasses}>
          <GiBookCover size={32} />
          <h1>Disciplinas</h1>
        </LinkButton>
        <LinkButton href="/coordinator/manage_test_days" className={baseButtonClasses}>
          <IoCalendar size={32} />
          <h1>Avaliações</h1>
        </LinkButton>
        <LinkButton href="/coordinator/reports" className={baseButtonClasses}>
          <HiOutlineDocumentReport size={32} />
          <h1>Relatórios</h1>
        </LinkButton>
      </div>
    </div>
  )
}
