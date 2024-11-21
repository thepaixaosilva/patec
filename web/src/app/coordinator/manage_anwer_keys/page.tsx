'use client'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Modal from '@/components/Modal'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'
import Answerkeys from '@/components/Answerkeys'

interface Test {
  testId: number
  date: Date
  testType: string
  file?: File
  answerKeys?: string[] //aqui seriam os gabaritos cadastrados (entidade answerKey[])
}

export default function AnswerKey() {
  const [data, setData] = useState<Test[]>([
    { testId: 1, date: new Date('2024-01-01'), testType: '1º Semestre', answerKeys: ['A', 'B']},
    { testId: 2, date: new Date('2024-03-15'), testType: '2º Semestre'},
    { testId: 3, date: new Date('2024-06-20'), testType: 'Final' },
  ])

  const [isGabaritoModalOpen, setIsGabaritoModalOpen] = useState(false)

  const openGabaritoModal = () => setIsGabaritoModalOpen(true)
  const closeGabaritoModal = () => setIsGabaritoModalOpen(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)

  const handleTestSelection = (testId: number) => {
    setSelectedTestId(testId);
  };

  const openCadastrarGabaritoModal = (testId: number) => {
    setSelectedTestId(testId)
    setIsModalOpen(true)
  }
  const subject = ['Matemática', 'Português', 'História']

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

        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr></tr>
        </thead>
        <tbody></tbody>

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
                    {data.map((test, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{test.testId}</td>
                        <td className="border border-gray-300 p-2">{test.date.toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-2">{test.testType}</td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Button
                            onClick={() => {
                              closeGabaritoModal()
                              openCadastrarGabaritoModal(test.testId)
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Selecionar
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

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Cadastrar Gabarito">
          <motion.div>
            <p>Avaliação Selecionada: {selectedTestId}</p>
            {/* Campos para cadastrar o gabarito */}
            {selectedTestId !== null && (
            <Answerkeys subject={subject} testId = {selectedTestId}></Answerkeys>
            )}
          </motion.div>
        </Modal>

        {data.filter((test) => test.answerKeys && test.answerKeys.length > 0) && (
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
                {data
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