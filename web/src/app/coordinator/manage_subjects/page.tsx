'use client'
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from '@/components/Modal'
import { Button, Input } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

interface Subject {
  subjectId : string
  name : string
  semester : number
}

export default function SubjectManagement() {
  const [data, setData] = useState<Subject[]>([
    { subjectId: 'ADM0000', name: 'Administração', semester: 1 },
    { subjectId: 'ECO0000', name: 'Economia', semester: 3 },
    { subjectId: 'TST0000', name: 'Teste', semester: 4 }
  ])
  const [newSubject, setNewSubject] = useState<Subject>({ subjectId: '', name: '', semester: 0 })
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
    setNewSubject(data[index])
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

  // Função para adicionar um novo estudante
  const handleAddStudent = () => {
    if (newSubject.subjectId && newSubject.name && newSubject.semester) {
      setData((prevData) => [...prevData, newSubject])
      closeModal() // Fecha o modal após adicionar
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleEditSubject = () => {
    if (editIndex !== null && newSubject.subjectId && newSubject.name && newSubject.semester) {
      const updatedData = [...data]
      updatedData[editIndex] = newSubject
      setData(updatedData)
      closeEditModal()
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleDeleteSubject = () => {
    if (editIndex !== null) {
      setData((prevData) => prevData.filter((_, i) => i !== editIndex))
      closeDeleteModal()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-3/4 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Disciplinas</h1>
        <Button onClick={openModal} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
          Adicionar Disciplina
        </Button>

        {data.length === 0 ? (
          <p className="text-gray-500">Nenhuma disciplina cadastrada.</p>
        ) : (
          <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 w-1/6 border-b text-start">Código</th>
                <th className="p-2 w-2/6 border-b text-start">Nome</th>
                <th className="p-2 w-2/6 border-b">Semestre</th>
                <th className="p-2 w-1/12 border-b"></th>
                <th className="p-2 w-1/12 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((subject, index) => (
                <motion.tr key={index} className="hover:bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
                  <td className="p-2 w-1/6 border-b">{subject.subjectId}</td>
                  <td className="p-2 w-2/6 border-b">{subject.name}</td>
                  <td className="p-2 w-2/6 border-b text-center">{subject.semester}</td>
                  <td className="p-2 w-1/12 border-b text-center">
                    <Button onClick={() => openEditModal(index)} className="text-blue-500 hover:text-blue-700">
                      <FaPencilAlt />
                    </Button>
                  </td>
                  <td className="p-2 w-1/12 border-b text-center">
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
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Disciplina">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.1 }}>
                <Input
                  type="text"
                  placeholder="Código"
                  value={newSubject.subjectId}
                  onChange={(e) => setNewSubject({ ...newSubject, subjectId: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="number"
                  placeholder="E-mail"
                  value={newSubject.semester}
                  onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
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
                  placeholder="Código"
                  value={newSubject.subjectId}
                  onChange={(e) => setNewSubject({ ...newSubject, subjectId: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="text"
                  placeholder="Nome"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />
                <Input
                  type="number"
                  placeholder="Semestre"
                  value={newSubject.semester}
                  onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
                  className="border p-2 mb-4 w-full rounded"
                />
                <div className="flex justify-end">
                  <Button onClick={handleEditSubject} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
                <p>Tem certeza de que deseja excluir esta disciplina?</p>
                <div className="flex justify-end space-x-4">
                  <Button onClick={handleDeleteSubject} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
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
