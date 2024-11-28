'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaPaperclip, FaRegTrashCan } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ICreateTestDay } from '@/interfaces/testDay'
import Modal from '@/components/shared/Modal'
import { useCreateTestDay, useUpdateTestDay, useDeleteTestDay } from '@/hooks/mutations/mutationTestDay'
import useTestDays from '@/hooks/queries/useTestDay'
import { LinkButton } from '@/components/ui/link-button'
import { IoCalendar } from 'react-icons/io5'

export default function TestManagement() {
  const { data: testDays = [] } = useTestDays() // Utilize o hook para obter os testDays

  const [newTestDay, setNewTestDay] = useState<ICreateTestDay>({ id: 0, testDate: new Date(), testType: '', file: null })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const { mutate: createTestDay } = useCreateTestDay()
  const { mutate: updateTestDay } = useUpdateTestDay()
  const { mutate: deleteTestDay } = useDeleteTestDay()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setNewTestDay({ id: 0, testDate: new Date(), testType: '', file: null })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewTestDay({ ...newTestDay, file })
    }
  }

  const openEditModal = (index: number) => {
    // setEditIndex(index)
    // setNewTestDay(testDays[index])
    // setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setNewTestDay({ id: 0, testDate: new Date(), testType: '', file: null })
  }

  const openDeleteModal = (index: number) => {
    setEditIndex(index)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleCreateTest = () => {
    if (newTestDay.testDate && newTestDay.testType && newTestDay.file) {
      const formData = new FormData()
      formData.append('testDate', newTestDay.testDate.toISOString())
      formData.append('testType', newTestDay.testType)
      formData.append('file', newTestDay.file)

      createTestDay(formData)
      closeModal()
    } else {
      alert('Preencha todos os campos e anexe um arquivo!')
    }
  }

  const handleEditTest = () => {
    if (editIndex !== null && newTestDay.id && newTestDay.testDate && newTestDay.testType && newTestDay.file) {
      const formData = new FormData()
      formData.append('testDate', newTestDay.testDate.toISOString())
      formData.append('testType', newTestDay.testType)
      formData.append('file', newTestDay.file)

      updateTestDay({ testDayId: newTestDay.id, testDay: formData })
      closeEditModal()
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleDeleteTest = () => {
    if (editIndex !== null) {
      deleteTestDay(testDays[editIndex].id)
      closeDeleteModal()
    }
  }

  console.log(testDays)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-violet-200 to-purple-200 py-8">
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
          <IoCalendar className="text-6xl text-purple-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Gerenciamento de Avaliações</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full" />
        </div>

        <Button
          onClick={openModal}
          className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span> Adicionar Avaliação
        </Button>

        {testDays.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <IoCalendar className="text-5xl mb-4 opacity-50" />
            <p className="text-xl text-center">Nenhuma avaliação cadastrada.</p>
          </div>
        ) : (
          <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="max-h-96 overflow-y-auto">
              <table className="bg-white rounded-xl shadow-lg w-full border border-gray-100">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 w-1/4 text-start text-lg font-semibold text-gray-700">Código</th>
                    <th className="p-4 w-1/4 text-start text-lg font-semibold text-gray-700">Data</th>
                    <th className="p-4 w-1/4 text-start text-lg font-semibold text-gray-700">Tipo</th>
                    <th className="p-4 w-1/6 text-center text-lg font-semibold text-gray-700">Arquivo</th>
                    <th className="p-4 w-1/12 text-center"></th>
                    <th className="p-4 w-1/12 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {testDays.map((test, index) => {
                    const testDate = test.testDate instanceof Date ? test.testDate : new Date(test.testDate)

                    return (
                      <motion.tr
                        key={index}
                        className="hover:bg-blue-50/50 transition-colors duration-150"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1 }}
                      >
                        <td className="p-4 w-1/4 font-medium text-gray-700">{test.id}</td>
                        <td className="p-4 w-1/4 text-gray-600">{testDate.toLocaleDateString()}</td>
                        <td className="p-4 w-1/4 text-gray-600">{test.testType}</td>
                        {test.filePath ? (
                          <td className="p-4 w-1/6 text-center">
                            <LinkButton
                              as="a"
                              href={`/uploads/test-days/${test.filePath}`}
                              rel="noopener noreferrer"
                              className="text-center text-green-600 hover:text-green-700 p-3 hover:bg-green-50 rounded-xl transition-colors"
                            >
                              <FaPaperclip size={20} />
                            </LinkButton>
                          </td>
                        ) : (
                          <td className="w-[15%] text-center text-lg font-semibold text-gray-700"></td>
                        )}
                        <td className="p-4 w-1/12 text-center">
                          <Button onClick={() => openEditModal(index)} className="text-center text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                            <FaPencilAlt size={20} />
                          </Button>
                        </td>
                        <td className="p-4 w-1/12 text-center">
                          <Button onClick={() => openDeleteModal(index)} className="text-center text-red-500 hover:text-red-600 p-3 hover:bg-red-50 rounded-xl transition-colors">
                            <FaRegTrashCan size={20} />
                          </Button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        {/* Modal de Adição */}
        <AnimatePresence>
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Avaliação">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="space-y-6"
              >
                <Input
                  type="date"
                  placeholder="Data"
                  value={newTestDay.testDate.toISOString().split('T')[0]}
                  onChange={(e) => setNewTestDay({ ...newTestDay, testDate: new Date(e.target.value) })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  placeholder="Tipo"
                  value={newTestDay.testType}
                  onChange={(e) => setNewTestDay({ ...newTestDay, testType: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                {/* Anexar avaliação */}
                <div className="flex flex-col">
                  <label htmlFor="fileUpload" className="flex items-center space-x-2 text-blue-600 cursor-pointer">
                    <FaPaperclip size={20} />
                    <span>Anexar arquivo</span>
                  </label>
                  <Input id="fileUpload" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                  {newTestDay.file && (
                    <p className="text-sm text-gray-500">
                      Arquivo selecionado: <span className="font-medium">{(newTestDay.file as File).name}</span>
                    </p>
                  )}
                </div>
                <Button onClick={handleCreateTest} className="w-full bg-blue-600 text-white py-3 rounded-xl">
                  Adicionar
                </Button>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
        {/* Modal de edição */}
        <AnimatePresence>
          {isEditModalOpen && (
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Editar Avaliação">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="space-y-6"
              >
                <Input
                  type="date"
                  placeholder="Data"
                  value={newTestDay.testDate.toISOString().split('T')[0]}
                  onChange={(e) => setNewTestDay({ ...newTestDay, testDate: new Date(e.target.value) })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  type="text"
                  placeholder="Tipo"
                  value={newTestDay.testType}
                  onChange={(e) => setNewTestDay({ ...newTestDay, testType: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                {/* Anexar avaliação 
                <div className="flex flex-col">
                  <label htmlFor="fileUpload" className="flex items-center space-x-2 text-blue-600 cursor-pointer">
                    <FaPaperclip size={20} />
                    <span>Anexar arquivo</span>
                  </label>
                  <Input id="fileUpload" type="file" onChange={handleFileChange} className="hidden" />
                  {newTestDay.file && (
                    <p className="text-sm text-gray-500">
                      Arquivo selecionado: <span className="font-medium">{newTest.file.name}</span>
                    </p>
                  )}
                </div>  */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleEditTest}
                    className="bg-gradient-to-r from-red-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
                  >
                    Salvar
                  </Button>
                </div>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
        {/* Modal de Confirmação de Exclusão */}
        <AnimatePresence>
          {isDeleteModalOpen && (
            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirmar Exclusão">
              <div className="space-y-6">
                <p className="text-lg text-gray-600">Tem certeza de que deseja excluir esta avaliação?</p>
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleDeleteTest}
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
      </motion.div>
    </div>
  )
}
