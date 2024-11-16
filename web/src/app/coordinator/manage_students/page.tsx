'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import Modal from '@/components/Modal'

interface Student {
  ra: string
  name: string
  email: string
}

export default function StudentManagement() {
  const [data, setData] = useState<Student[]>([
    { ra: '105', name: 'Matheus', email: 'teste@email.com' },
    { ra: '105', name: 'Matheus', email: 'teste@email.com' },
    { ra: '105', name: 'Matheus', email: 'teste@email.com' },
  ])
  const [newStudent, setNewStudent] = useState<Student>({
    ra: '',
    name: '',
    email: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true)
  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false)
    setNewStudent({ ra: '', name: '', email: '' }) // Limpar o formulário
  }

  // Função para adicionar um novo estudante
  const handleAddStudent = () => {
    if (newStudent.ra && newStudent.name && newStudent.email) {
      setData((prevData) => [...prevData, newStudent])
      closeModal() // Fecha o modal após adicionar
    } else {
      alert('Preencha todos os campos!')
    }
  }

  // Funções para manipular edição e exclusão
  const handleEdit = (index: number) => {
    console.log(`Editando estudante no índice: ${index}`)
  }

  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-3/4 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Alunos</h1>

        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
          Adicionar Aluno
        </button>

        {data.length === 0 ? (
          <p className="text-gray-500">Nenhum aluno cadastrado.</p>
        ) : (
          <table className="w-full border-collapse">
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
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{student.ra}</td>
                  <td className="p-2 border-b">{student.name}</td>
                  <td className="p-2 border-b">{student.email}</td>
                  <td className="p-2 border-b text-center">
                    <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700">
                      <FaPencilAlt />
                    </button>
                  </td>
                  <td className="p-2 border-b text-center">
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                      <FaRegTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Aluno">
          <input
            type="text"
            placeholder="RA"
            value={newStudent.ra}
            onChange={(e) => setNewStudent({ ...newStudent, ra: e.target.value })}
            className="border p-2 mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Nome"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border p-2 mb-2 w-full rounded"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="border p-2 mb-4 w-full rounded"
          />
          <div className="flex justify-end">
            <button onClick={handleAddStudent} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Adicionar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
