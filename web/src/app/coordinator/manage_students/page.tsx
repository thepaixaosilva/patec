'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaArrowLeft } from 'react-icons/fa6'
import Modal from '@/components/shared/Modal'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { PiStudentFill } from 'react-icons/pi'
import useStudents from '@/hooks/queries/useStudents'
import { useCreateStudent, useUpdateStudent, useDeleteStudent } from '@/hooks/mutations/mutationUsers'
import { ICreateStudent } from '@/interfaces/users'

export default function StudentManagement() {
  const { data: students, refetch } = useStudents() // Use refetch here to reload data
  const { mutate: createStudent } = useCreateStudent()
  const { mutate: updateStudent } = useUpdateStudent()
  const { mutate: deleteStudent } = useDeleteStudent()

  const [newStudent, setNewStudent] = useState<ICreateStudent>({ ra: '', name: '', email: '', password: '', role: 'student' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Funções para abrir e fechar modais
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setNewStudent({ ra: '', name: '', email: '', password: '', role: 'student' })
  }

  const openEditModal = (index: number) => {
    if (students && students[index]) {
      setEditIndex(index)
      setNewStudent({
        ra: students[index]?.ra || '',
        name: students[index]?.name || '',
        email: students[index]?.email || '',
        password: students[index]?.ra,
        role: students[index]?.role || 'student',
      })
      setIsEditModalOpen(true)
    }
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setNewStudent({ ra: '', name: '', email: '', password: '', role: 'student' })
  }

  const openDeleteModal = (index: number) => {
    setEditIndex(index)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  // Funções para adicionar, editar e deletar
  const handleAddStudent = () => {
    if (newStudent.ra && newStudent.name && newStudent.email) {
      createStudent(
        {
          ...newStudent,
          password: newStudent.ra, // Explicitamente define a senha como RA
        },
        {
          onSuccess: () => {
            refetch()
            closeModal()
          },
          onError: (error) => {
            console.error('Erro ao adicionar aluno:', error)
            alert('Erro ao adicionar aluno. Verifique os dados.')
          },
        }
      )
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleEditStudent = () => {
    if (editIndex !== null && students && students[editIndex]) {
      if (newStudent.ra && newStudent.name && newStudent.email) {
        const updatedStudent = {
          ...newStudent,
          password: newStudent.ra, // Explicitamente define a senha como RA
          id: students[editIndex]?.id,
          iat: 0,
          exp: 0,
        }

        updateStudent(updatedStudent, {
          onSuccess: () => {
            refetch()
            closeEditModal()
          },
          onError: (error) => {
            console.error('Erro ao editar aluno:', error)
            alert('Erro ao editar aluno. Verifique os dados.')
          },
        })
      } else {
        alert('Preencha todos os campos!')
      }
    } else {
      alert('Aluno não encontrado ou inválido.')
    }
  }

  const handleDeleteStudent = () => {
    if (editIndex !== null && students && students[editIndex]) {
      deleteStudent(students[editIndex]?.ra, {
        onSuccess: () => {
          refetch() // Refetch data after deleting a student
        },
      })
      closeDeleteModal()
    } else {
      alert('Aluno não encontrado ou inválido.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200 py-8">
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
          <PiStudentFill className="text-6xl text-green-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Gerenciamento de Alunos</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
        </div>

        <Button
          onClick={openModal}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span> Adicionar Aluno
        </Button>

        {students?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <PiStudentFill className="text-5xl mb-4 opacity-50" />
            <p className="text-xl text-center">Nenhum aluno cadastrado.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full" // Adicionei esta classe para manter a consistência
          >
            <div className="max-h-96 overflow-y-auto">
              {' '}
              {/* Novo container com rolagem */}
              <table className="bg-white rounded-xl shadow-lg w-full border border-gray-100">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">RA</th>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">Nome</th>
                    <th className="p-4 w-2/6 text-start text-lg font-semibold text-gray-700">E-mail</th>
                    <th className="p-4 w-1/12"></th>
                    <th className="p-4 w-1/12"></th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <td className="p-4 w-2/6 font-medium text-gray-700">{student.ra}</td>
                      <td className="p-4 w-2/6 text-gray-600">{student.name}</td>
                      <td className="p-4 w-2/6 text-gray-600">{student.email}</td>
                      <td className="p-4 w-1/12 text-center">
                        <Button onClick={() => openEditModal(index)} className="text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-colors">
                          <FaPencilAlt size={20} />
                        </Button>
                      </td>
                      <td className="p-4 w-1/12 text-center">
                        <Button onClick={() => openDeleteModal(index)} className="text-red-600 hover:text-red-700 p-3 hover:bg-red-50 rounded-xl transition-colors">
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

      {/* Modal de Adição */}
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Aluno">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="space-y-6"
            >
              <Input
                type="text"
                placeholder="RA"
                value={newStudent.ra}
                onChange={(e) => setNewStudent({ ...newStudent, ra: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Input
                type="text"
                placeholder="Nome"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Input
                type="email"
                placeholder="E-mail"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddStudent}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
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
          <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Editar Aluno">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="space-y-6"
            >
              <Input
                type="text"
                placeholder="RA"
                value={newStudent.ra}
                onChange={(e) => setNewStudent({ ...newStudent, ra: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled
              />
              <Input
                type="text"
                placeholder="Nome"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Input
                type="email"
                placeholder="E-mail"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleEditStudent}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
                >
                  Editar
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Modal de Exclusão */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirmar Exclusão">
            <div className="space-y-6">
              <p className="text-lg">Tem certeza que deseja excluir este aluno?</p>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={handleDeleteStudent}
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
