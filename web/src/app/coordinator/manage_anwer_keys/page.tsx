'use client'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Modal from '@/components/Modal'
import { Button } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'
import FormAnswerKeys from '@/components/FormAnswerKeys'
import { useQuery } from 'react-query'
import api from '@/config/api'
import { useDeleteAnswerKeys } from '@/hooks/mutations/mutationAnswerKeys'

//apagar depois: já vai existir essas duas interfaces quando integrar tudo
export interface Test {
  testId: number
  date: Date
  testType: string
  answerKeys?: number
}
export interface Subjects {
  id: number
  name: string
}

//TESTAR COM ESSE CÓDIGO (a ideia é que ele busque por todas as disciplinas/testes existentes)
const { data: allSubjects = [] } = useQuery<Subjects[]>('allSubjects', () =>
  api.get('/subjects').then((res) => res.data)
)

const { data: allTest = [] } = useQuery<Test[]>('allTest', () =>
  api.get('/test-days').then((res) => res.data)
)

//se der certo, excluir as constantes abaixo, foram usadas só para testar antes da integração com o back-end
/*const allSubjects: Subjects[] = [
  { id: 1, name: 'Matemática' },
  { id: 2, name: 'História' },
  { id: 3, name: 'Geografia' },
]
const allTest: Test[] = [
  { testId: 1, date: new Date('2024-01-01'), testType: '1º Semestre', answerKeys: 1 },
  { testId: 2, date: new Date('2024-03-15'), testType: '2º Semestre' },
  { testId: 3, date: new Date('2024-06-20'), testType: 'Final' },
]*/

const { mutate: deleteAnswerKey } = useDeleteAnswerKeys()
const handleDelete = (id: number) => {
  deleteAnswerKey(id)
}

export default function AnswerKey() {
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)

  const [isGabaritoModalOpen, setIsGabaritoModalOpen] = useState(false)
  const openGabaritoModal = () => setIsGabaritoModalOpen(true)
  const closeGabaritoModal = () => setIsGabaritoModalOpen(false)
  const openCadastrarGabaritoModal = (testId: number) => {
    setSelectedTestId(testId)
    setIsFormModalOpen(true)
  }

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const closeFormModal = () => setIsFormModalOpen(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-red-200 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-11/12 max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100"
      >
        <Link href="/coordinator/dashboard" className="absolute left-8 top-8">
          <Button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1">
            <FaArrowLeft size={24} />
            Voltar
          </Button>
        </Link>

        <div className="flex flex-col items-center mb-12">
          <GiBookCover className="text-6xl text-red-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Gerenciamento de Avaliações</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
        </div>

        <Button
          onClick={openGabaritoModal}
          className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          Cadastrar Gabarito
        </Button>

        <Modal isOpen={isFormModalOpen} onClose={closeFormModal} title="Cadastrar Gabarito">
          <motion.div>
            <p>Avaliação Selecionada: {selectedTestId}</p>
            {selectedTestId !== null && <FormAnswerKeys subjects={allSubjects} testId={selectedTestId}></FormAnswerKeys>}
          </motion.div>
        </Modal>

        <AnimatePresence>
          {isGabaritoModalOpen && (
            <Modal isOpen={isGabaritoModalOpen} onClose={closeGabaritoModal} title="Selecionar Avaliação">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="space-y-6"
              >
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">Código</th>
                      <th className="border border-gray-300 p-2">Data</th>
                      <th className="border border-gray-300 p-2">Tipo</th>
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTest.map((test, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{test.testId}</td>
                        <td className="border border-gray-300 p-2">{test.date.toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-2">{test.testType}</td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Button
                            onClick={() => {
                              closeGabaritoModal()
                              openCadastrarGabaritoModal(test.testId)
                            }} className="text-blue-500 hover:text-blue-700">
                            Selecionar
                          </Button>
                          <Button 
                            onClick={() => 
                              handleDelete(test.testId
                            )} className="text-red-500 hover:text-red-700">
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>

        {/*TESTAR: validar se essa lógica funciona, a ideia era exibir todas as avaliações com gabarito*/}
        {allTest.filter((test) => test.answerKeys && test.answerKeys > 0) && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Avaliações com Gabaritos</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2">Código</th>
                  <th className="border border-gray-300 p-2">Data</th>
                  <th className="border border-gray-300 p-2">Tipo</th>
                  <th className="border border-gray-300 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {allTest
                  .filter((test) => test.answerKeys)
                  .map((test, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">{test.testId}</td>
                      <td className="border border-gray-300 p-2">{test.date.toLocaleDateString()}</td>
                      <td className="border border-gray-300 p-2">{test.testType}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <Button onClick={() => openCadastrarGabaritoModal(test.testId)} className="text-blue-500 hover:text-blue-700">
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
