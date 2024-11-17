'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import Modal from '@/components/Modal'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'
import useSubjects from '@/hooks/useSubjects'
import api from '@/config/api'

export default function SubjectManagement() {

  const { subjects, setSubjects } = useSubjects()

  const [newSubject, setNewSubject] = useState({ subjectId: '', name: '', semester: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true)
  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false)
    setNewSubject({ subjectId: '', name: '', semester: 0 }) // Limpar o formulário
  }

  const openEditModal = (index: number) => {
    setEditIndex(index)
    setNewSubject(subjects[index])
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setNewSubject({ subjectId: '', name: '', semester: 0 })
  }

  const openDeleteModal = (index: number) => {
    setEditIndex(index)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleAddSubject = async () => {
    if (newSubject.subjectId && newSubject.name && newSubject.semester) {
      try {
        const response = await api.post('/subjects', newSubject)
        setSubjects((prevSubjects) => [...prevSubjects, response.data])
        closeModal()
      } catch (error) {
        console.error('Erro ao adicionar disciplina: ', error)
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleEditSubject = async () => {
    if (editIndex !== null && newSubject.subjectId && newSubject.name && newSubject.semester) {
      try {
        const response = await api.patch(`/subjects/${subjects[editIndex].subjectId}`, newSubject)
        const updatedSubjects = [...subjects]
        updatedSubjects[editIndex] = response.data
        setSubjects(updatedSubjects)
        closeEditModal()
      } catch (error) {
        console.error('Erro ao editar disciplina:', error)
      }
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleDeleteSubject = async () => {
    if (editIndex !== null) {
      try {
        await api.delete(`/subjects/${subjects[editIndex].subjectId}`)
        console.log(subjects[editIndex].subjectId)
        setSubjects((prevSubjects) => prevSubjects.filter((_, i) => i !== editIndex))
        closeDeleteModal()
      } catch (error) {
        console.error('Erro ao excluir disciplina:', error)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 via-orange-200 to-amber-200 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-11/12 max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100"
      >
        {/* Botão de Retorno */}
        <Link href="/coordinator/dashboard" className="absolute left-8 top-8">
          <Button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1">
            <FaArrowLeft size={24} />
            Voltar
          </Button>
        </Link>

        <div className="flex flex-col items-center mb-12">
          <GiBookCover className="text-6xl text-red-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Gerenciamento de Disciplinas</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
        </div>

        <Button
          onClick={openModal}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span> Adicionar Disciplina
        </Button>

        {subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <GiBookCover className="text-5xl mb-4 opacity-50" />
            <p className="text-xl text-center">Nenhuma disciplina cadastrada.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Código</th>
                  <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Nome</th>
                  <th className="p-4 w-2/6 text-center text-lg font-semibold text-gray-700">Semestre</th>
                  <th className="p-4 w-1/12"></th>
                  <th className="p-4 w-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-blue-50/50 transition-colors duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <td className="p-4 w-2/6 font-medium text-gray-700">{subject.subjectId}</td>
                    <td className="p-4 w-2/6 text-gray-600">{subject.name}</td>
                    <td className="p-4 w-2/6 text-center">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{subject.semester}º Semestre</span>
                    </td>
                    <td className="p-4 w-1/12 text-center">
                      <Button onClick={() => openEditModal(index)} className="text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                        <FaPencilAlt size={20} />
                      </Button>
                    </td>
                    <td className="p-4 w-1/12 text-center">
                      <Button onClick={() => openDeleteModal(index)} className="text-red-500 hover:text-red-600 p-3 hover:bg-red-50 rounded-xl transition-colors">
                        <FaRegTrashCan size={20} />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Modal de Adição */}
        <AnimatePresence>
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Disciplina">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="space-y-6"
              >
                <Input
                  type="text"
                  placeholder="Código"
                  value={newSubject.subjectId}
                  onChange={(e) => setNewSubject({ ...newSubject, subjectId: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Input
                  type="number"
                  placeholder="Semestre"
                  value={newSubject.semester}
                  onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddSubject}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
                  >
                    Adicionar
                  </Button>
                </div>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Modal de Edição */}
        <AnimatePresence>
          {isEditModalOpen && (
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Editar Disciplina">
              <div className="space-y-6">
                <Input
                  type="text"
                  placeholder="Código"
                  value={newSubject.subjectId}
                  onChange={(e) => setNewSubject({ ...newSubject, subjectId: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Input
                  type="number"
                  placeholder="Semestre"
                  value={newSubject.semester}
                  onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
                  className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleEditSubject}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Modal de Confirmação de Exclusão */}
        <AnimatePresence>
          {isDeleteModalOpen && (
            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirmar Exclusão">
              <div className="space-y-6">
                <p className="text-lg text-gray-600">Tem certeza de que deseja excluir esta disciplina?</p>
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={handleDeleteSubject}
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
