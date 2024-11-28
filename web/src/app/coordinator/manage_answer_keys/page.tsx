'use client'
import { useState } from 'react'
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import Modal from '@/components/shared/Modal'
import { Button } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { RiFileListLine } from 'react-icons/ri'
import { useQuery } from 'react-query'
import api from '@/config/api'
import { useDeleteAnswerKeys } from '@/hooks/mutations/mutationAnswerKeys'
import { ITestDay } from '@/interfaces/testDay'
import { ISubject } from '@/interfaces/subjects'
import FormAnswerKeys from '@/components/FormAnswerKeys'

export default function AnswerKeyManagement() {
  const { data: allSubjects = [] } = useQuery<ISubject[]>('allSubjects', () => api.get('/subjects').then((res) => res.data))

  const { data: allTests = [], refetch } = useQuery<ITestDay[]>('allTests', () => api.get('/test-days').then((res) => res.data))

  const { mutate: deleteAnswerKey } = useDeleteAnswerKeys()

  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openDeleteModal = (testId: number) => {
    setSelectedTestId(testId)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const openEditModal = (testId: number) => {
    setSelectedTestId(testId)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => setIsEditModalOpen(false)

  const handleDelete = () => {
    if (selectedTestId) {
      deleteAnswerKey(selectedTestId, {
        onSuccess: () => {
          refetch()
          closeDeleteModal()
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-200 py-8">
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
          <RiFileListLine className="text-6xl text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Gerenciamento de Gabaritos</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
        </div>

        <Button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span> Cadastrar Gabarito
        </Button>

        {allTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <RiFileListLine className="text-5xl mb-4 opacity-50" />
            <p className="text-xl text-center">Nenhum teste cadastrado.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full">
            <div className="max-h-96 overflow-y-auto">
              <table className="bg-white rounded-xl shadow-lg w-full border border-gray-100">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Código</th>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Data</th>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Tipo</th>
                    <th className="p-4 w-1/12"></th>
                    <th className="p-4 w-1/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {allTests.map((test, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <td className="p-4 w-2/6 font-medium text-gray-700">{test.id}</td>
                      <td className="p-4 w-2/6 text-gray-600">{test.testDate ? new Date(test.testDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-4 w-2/6 text-gray-600">{test.testType}</td>
                      <td className="p-4 w-1/12 text-center">
                        <Button onClick={() => openEditModal(test.id)} className="text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                          <FaPencilAlt size={20} />
                        </Button>
                      </td>
                      <td className="p-4 w-1/12 text-center">
                        <Button onClick={() => openDeleteModal(test.id)} className="text-red-600 hover:text-red-700 p-3 hover:bg-red-50 rounded-xl transition-colors">
                          <FaRegTrashCan size={20} />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Modal de Criação de Gabarito */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal} title="Selecionar Avaliação para Gabarito">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="space-y-6"
            >
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Código</th>
                    <th className="p-2 text-left">Data</th>
                    <th className="p-2 text-left">Tipo</th>
                    <th className="p-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {allTests.map((test) => (
                    <tr key={test.id} className="hover:bg-blue-50 transition-colors">
                      <td className="p-2">{test.id}</td>
                      <td className="p-2">{test.testDate ? new Date(test.testDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="p-2">{test.testType}</td>
                      <td className="p-2 text-right">
                        <Button
                          onClick={() => {
                            setSelectedTestId(test.id)
                            closeCreateModal()
                            setIsEditModalOpen(true)
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Criar Gabarito
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

      {/* Modal de Edição de Gabarito */}
      <AnimatePresence>
        {isEditModalOpen && selectedTestId && (
          <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Cadastrar/Editar Gabarito">
            <motion.div>
              <FormAnswerKeys
                subjects={allSubjects}
                testId={selectedTestId}
                onSuccess={() => {
                  refetch()
                  closeEditModal()
                }}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Modal de Confirmação de Exclusão */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirmar Exclusão">
            <div className="space-y-6">
              <p className="text-lg">Tem certeza que deseja excluir este gabarito?</p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 hover:shadow-lg transition-all duration-200 text-lg font-semibold"
                >
                  Excluir
                </Button>
                <Button
                  onClick={closeDeleteModal}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 hover:shadow-lg transition-all duration-200 text-lg font-semibold"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}
