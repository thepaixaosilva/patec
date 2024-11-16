'use client'
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from '@/components/Modal'

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
  const [newSubject, setNewSubject] = useState<Subject>({
    subjectId: '',
    name: '',
    semester: 0,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true)
  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false)
    setNewSubject({ subjectId: '', name: '', semester: 0 }) // Limpar o formulário
  }

  // Função para adicionar um novo estudante
  const handleAddStudent = () => {
    if (newSubject.subjectId && newSubject.name && newSubject.semester) {
      setData((prevData) => [...prevData, newSubject])
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
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Disciplinas</h1>

        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4">
          Adicionar Disciplina
        </button>
        
        {data.length === 0 ? (
          <p className="text-gray-500">Nenhuma disciplina cadastrada.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border-b">Código</th>
                <th className="p-2 border-b">Nome</th>
                <th className="p-2 border-b">Semestre</th>
                <th className="p-2 border-b"></th>
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{subject.subjectId}</td>
                  <td className="p-2 border-b">{subject.name}</td>
                  <td className="p-2 border-b">{subject.semester}</td>
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Disciplina">
          <input
            type="text"
            placeholder="Código"
            value={newSubject.subjectId}
            onChange={(e) => setNewSubject({ ...newSubject, subjectId: e.target.value })}
            className="border p-2 mb-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Nome"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="border p-2 mb-2 w-full rounded"
          />
          <input
            type="number"
            placeholder="Semestre"
            value={newSubject.semester}
            onChange={(e) => setNewSubject({ ...newSubject, semester: Number(e.target.value) })}
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
