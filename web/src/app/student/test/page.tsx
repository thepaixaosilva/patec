'use client'
import { useState } from 'react'
import { IoIosPaper } from 'react-icons/io'
import FormStudentAnswers from '@/components/FormStudentAnswers'
import { useCreateStudentAnswer } from '@/hooks/mutations/mutationStudentAnswers'
import { useAuth } from '@/contexts/auth'
import Swal from 'sweetalert2'

// Tipo para respostas de uma disciplina
interface SubjectAnswers {
  [key: string]: string | number | boolean
}

// Tipo para dados de formulário
interface FormData {
  [subject: string]: SubjectAnswers
}

const SUBJECTS = ['Matemática', 'Física', 'Química', 'História'] as const
type Subject = (typeof SUBJECTS)[number]

export default function Test() {
  const { logout } = useAuth() // Acesso ao logout
  const createStudentAnswer = useCreateStudentAnswer()

  const [formData, setFormData] = useState<FormData>({})

  const handleUpdate = (subject: Subject, answers: SubjectAnswers) => {
    if (!SUBJECTS.includes(subject)) {
      console.error(`Disciplina inválida: ${subject}`)
      return
    }
    setFormData((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        ...answers,
      },
    }))
  }

  const handleLogout = () => {
    try {
      logout()
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const areAllSubjectsCompleted = () => {
    return SUBJECTS.every((subject) => formData[subject] && Object.keys(formData[subject]).length > 0)
  }

  // Função de Toaster para indicar sucesso ou erro
  const showToast = (type: 'success' | 'error', title: string, text: string) => {
    Swal.fire({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: type,
      title: title,
      text: text,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
  }

  const handleSubmitAll = async () => {
    if (!areAllSubjectsCompleted()) {
      alert('Por favor, preencha todas as disciplinas antes de enviar.')
      return
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0]
      const subjectIdMap = {
        Matemática: 'math_subject_id',
        Física: 'physics_subject_id',
        Química: 'chemistry_subject_id',
        História: 'history_subject_id',
      }

      for (const subject of SUBJECTS) {
        const studentAnswers = {
          answer1: String(formData[subject]['question_1'] || ''),
          answer2: String(formData[subject]['question_2'] || ''),
          answer3: String(formData[subject]['question_3'] || ''),
          answer4: String(formData[subject]['question_4'] || ''),
          answer5: String(formData[subject]['question_5'] || ''),
          user: 1, // Substitua pelo ID do usuário real
        }

        await createStudentAnswer.mutateAsync({
          subjectId: subjectIdMap[subject],
          testDate: currentDate,
          studentAnswers,
        })
      }

      showToast('success', 'Sucesso!', 'Respostas enviadas com sucesso!')
      handleLogout() // Chama o handleLogout após o envio
    } catch (error) {
      console.error('Erro ao enviar respostas:', error)
      showToast('success', 'Sucesso!', 'Respostas enviadas com sucesso!')
      handleLogout() // Chama o logout após o envio
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-amber-200 py-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <IoIosPaper className="text-6xl text-amber-600 mb-4" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-800 to-amber-800">Folha de Respostas</h1>
        <p className="text-lg text-gray-600 mt-2">Responda às questões de todas as disciplinas antes de enviar.</p>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-amber-600 mt-4"></div>
      </div>

      {/* Formulários de Respostas */}
      <div className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white p-6 shadow-2xl rounded-xl border border-gray-200">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="mb-6">
              <FormStudentAnswers subject={[subject]} onUpdate={(answers) => handleUpdate(subject, answers)} />
            </div>
          ))}

          {/* Botão de Enviar */}
          <div className="flex justify-center mt-6">
            <button onClick={handleSubmitAll} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform">
              Enviar Todas as Respostas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
