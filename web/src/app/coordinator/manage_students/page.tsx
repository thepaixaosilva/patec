'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '@/components/Modal'
import { Button, Input } from '@chakra-ui/react'

interface Student {
  ra: string
  name: string
  email: string
}

export default function StudentManagement() {
  const [data, setData] = useState<Student[]>([
    { ra: '105', name: 'Matheus', email: 'teste@email.com' },
    { ra: '106', name: 'João', email: 'joao@email.com' },
    { ra: '107', name: 'Maria', email: 'maria@email.com' },
  ])
  const [newStudent, setNewStudent] = useState<Student>({ ra: '', name: '', email: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // Funções para abrir e fechar modais
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setNewStudent({ ra: '', name: '', email: '' })
  }

  const openEditModal = (index: number) => {
    setEditIndex(index)
    setNewStudent(data[index])
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setNewStudent({ ra: '', name: '', email: '' })
  }

  const openDeleteModal = (index: number) => {
    setEditIndex(index)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  // Funções para adicionar, editar e deletar
  const handleAddStudent = () => {
    if (newStudent.ra && newStudent.name && newStudent.email) {
      setData((prevData) => [...prevData, newStudent])
      closeModal()
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleEditStudent = () => {
    if (editIndex !== null && newStudent.ra && newStudent.name && newStudent.email) {
      const updatedData = [...data]
      updatedData[editIndex] = newStudent
      setData(updatedData)
      closeEditModal()
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleDeleteStudent = () => {
    if (editIndex !== null) {
      setData((prevData) => prevData.filter((_, i) => i !== editIndex))
      closeDeleteModal()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-3/4 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Alunos</h1>
        <Button onClick={openModal} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
          Adicionar Aluno
        </Button>

        {data.length === 0 ? (
          <p className="text-gray-500">Nenhum aluno cadastrado.</p>
        ) : (
          <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border-b">RA</th>
                <th className="p-2 border-b">Nome</th>
                <th className="p-2 border-b">E-mail</th>
                <th className="p-2 border-b"></th>
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <motion.tr key={index} className="hover:bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  <td className="p-2 border-b">{student.ra}</td>
                  <td className="p-2 border-b">{student.name}</td>
                  <td className="p-2 border-b">{student.email}</td>
                  <td className="p-2 border-b text-center">
                    <Button onClick={() => openEditModal(index)} className="text-blue-500 hover:text-blue-700">
                      <FaPencilAlt />
                    </Button>
                  </td>
                  <td className="p-2 border-b text-center">
                    <Button onClick={() => openDeleteModal(index)} className="text-red-500 hover:text-red-700">
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}

        {/* Modal de Adição */}
        <AnimatePresence>
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Aluno">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.1 }}>
                <Input
                  type="text"
                  placeholder="RA"
                  value={newStudent.ra}
                  onChange={(e) => setNewStudent({ ...newStudent, ra: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="border p-2 mb-4 w-full rounded"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="RA"
                  value={newStudent.ra}
                  onChange={(e) => setNewStudent({ ...newStudent, ra: e.target.value })}
                  className="border p-2 w-full rounded"
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="border p-2 w-full rounded"
                />
                <Input
                  type="email"
                  placeholder="E-mail"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="border p-2 w-full rounded"
                />
                <div className="flex justify-end">
                  <Button onClick={handleEditStudent} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
              <div className="space-y-4">
                <p>Tem certeza de que deseja excluir este aluno?</p>
                <div className="flex justify-end space-x-4">
                  <Button onClick={handleDeleteStudent} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                    Excluir
                  </Button>
                  <Button onClick={closeDeleteModal} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
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
