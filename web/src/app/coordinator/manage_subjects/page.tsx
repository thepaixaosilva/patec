'use client'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import Modal from '@/components/shared/Modal'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { GiBookCover } from 'react-icons/gi'
import useSubjects from '@/hooks/queries/useSubjects'
import { useCreateSubject, useUpdateSubject, useDeleteSubject } from '@/hooks/mutations/mutationSubjects'
import { ISubject } from '@/interfaces/subjects'
import useUserSubjects from '@/hooks/queries/useUserSubjects'
import { useUploadUserSubjectCsv } from '@/hooks/mutations/mutationUserSubjects'
import Swal from 'sweetalert2'

export default function SubjectManagement() {
  
  
  const [subjectId] = useState<string>(''); 
  const [csvFile, setCsvFile] = useState<File | null>(null); 

  const uploadCsvMutation = useUploadUserSubjectCsv();
  const [uploading, setUploading] = useState(false);
  
  const [newSubject, setNewSubject] = useState<ISubject>({ subjectId: '', name: '', semester: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const { data: subjects } = useSubjects()
  const { mutate: createSubject } = useCreateSubject()
  const { mutate: updateSubject } = useUpdateSubject()
  const { mutate: deleteSubject } = useDeleteSubject()

  const { data: userSubject } = useUserSubjects(subjectId);
  //const uploadCsvMutation = useUploadUserSubjectCsv();
  //const deleteUserSubject = useDeleteSubject();
  
  const showToast = (type: 'success' | 'error', title: string, text: string) => {
    Swal.fire({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: type,
      title: title,
      text: text,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setNewSubject({ subjectId: '', name: '', semester: 1 })
  }

  const openEditModal = (index: number) => {
    if (subjects) {
      setEditIndex(index)
      setNewSubject(subjects[index])
      setIsEditModalOpen(true)
    }
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setNewSubject({ subjectId: '', name: '', semester: 1 })
  }

  const openDeleteModal = (index: number) => {
    setEditIndex(index)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const openUploadModal = (index: number) => {
    setEditIndex(index)
    if (subjects) {
      setNewSubject(subjects[index])
      setIsUploadModalOpen(true)
    }
  }
  const closeUploadModal = () => setIsUploadModalOpen(false)

  const handleAddSubject = async () => {
    if (newSubject.subjectId && newSubject.name && newSubject.semester) {
      createSubject(newSubject, {
        onSuccess: () => {
          closeModal()
          showToast('success', 'Sucesso', 'Disciplina adicionada com sucesso!')
        },
        onError: (error) => {
          console.error('Erro ao adicionar disciplina:', error)
          showToast('error', 'Erro', 'Não foi possível adicionar a disciplina.')
        },
      })
    } else {
      showToast('error', 'Erro', 'Preencha todos os campos!')
    }
  }

  const handleEditSubject = async () => {
    if (editIndex !== null && newSubject.subjectId && newSubject.name && newSubject.semester) {
      updateSubject(newSubject, {
        onSuccess: () => {
          closeEditModal()
          showToast('success', 'Sucesso', 'Disciplina atualizada com sucesso!')
        },
        onError: (error) => {
          console.error('Erro ao editar disciplina:', error)
          showToast('error', 'Erro', 'Não foi possível editar a disciplina.')
        },
      })
    } else {
      showToast('error', 'Erro', 'Preencha todos os campos!')
    }
  }

  const handleDeleteSubject = async () => {
    if (editIndex !== null && subjects) {
      const subjectToDelete = subjects[editIndex]
      if (subjectToDelete) {
        deleteSubject(subjectToDelete.subjectId, {
          onSuccess: () => {
            closeDeleteModal()
            showToast('success', 'Sucesso', 'Disciplina excluída com sucesso!')
          },
          onError: (error) => {
            console.error('Erro ao excluir disciplina:', error)
            showToast('error', 'Erro', 'Não foi possível excluir a disciplina.')
          },
        })
      }
    }
  }

  const handleUploadCsv = async () => {  
    if (editIndex !== null && subjects) {
      const subjectToUpload = subjects[editIndex]
      if (subjectToUpload) {
        if (!csvFile) {
          alert('Por favor, selecione um arquivo.');
          return;
        }
        setUploading(true); 
        try {
          await uploadCsvMutation.mutateAsync({ file: csvFile, subjectId: subjectToUpload.subjectId });
          alert('Arquivo enviado e processado com sucesso!');
          setCsvFile(null);
          closeUploadModal();
        } catch (error) {
          console.error('Erro ao fazer upload do CSV:', error);
          alert('Erro ao fazer upload do CSV.');
        } finally {
          setUploading(false); 
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 via-orange-200 to-amber-200 py-8">
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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Gerenciamento de Disciplinas</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
        </div>

        <Button
          onClick={openModal}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105"
        >
          <span className="text-2xl">+</span> Adicionar Disciplina
        </Button>

        {subjects?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
            <GiBookCover className="text-5xl mb-4 opacity-50" />
            <p className="text-xl text-center">Nenhuma disciplina cadastrada.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full" // Adicionei esta classe para manter a consistência
          >
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="p-4 w-2/12 text-start text-lg font-semibold text-gray-700">Código</th>
                  <th className="p-4 w-4/12 text-start text-lg font-semibold text-gray-700">Nome</th>
                  <th className="p-4 w-2/12 text-center text-lg font-semibold text-gray-700">Semestre</th>
                  <th className="p-4 w-2/12 text-center text-lg font-semibold text-gray-700">Matrículas</th>
                  <th className="p-4 w-1/12"></th>
                  <th className="p-4 w-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {subjects?.map((subject: ISubject, index: number) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-blue-50/50 transition-colors duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <td className="p-4 w-2/12 font-medium text-gray-700">{subject.subjectId}</td>
                    <td className="p-4 w-4/12 text-gray-600">{subject.name}</td>
                    <td className="p-4 w-2/12  text-center">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{subject.semester}º Semestre</span>
                    </td>
                    <td className="p-4 w-2/12 text-center">
                      <Button
                        onClick={() => openUploadModal(index)}
                        title="Upload dos alunos matriculados na disciplina"
                        className="text-center text-green-600 hover:text-green-700 p-3 hover:bg-green-50 rounded-xl transition-colors"
                      >
                        <FaCloudUploadAlt />
                      </Button>
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

        {/* Modal de Matrícula de Aluno */}
        <AnimatePresence>
          {isUploadModalOpen && (
            <Modal isOpen={isUploadModalOpen} onClose={closeUploadModal} title="Alunos matriculados na disciplina">
              <div className="flex flex-col space-y-4">
                <div>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files ? e.target.files[0] : null)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleUploadCsv}
                    disabled={uploading}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold hover:scale-105"
                  >
                    Upload
                  </Button>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                  <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="p-4 text-start text-lg font-semibold text-gray-700">RA</th>
                        <th className="p-4 text-start text-lg font-semibold text-gray-700">Nome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSubject?.map((userSubject) => (
                        <motion.tr
                          key={null}
                          className="hover:bg-blue-50/50 transition-colors duration-150"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.1 }}
                        >
                          <td className="p-4 font-medium text-gray-700">{userSubject.ra}</td>
                          <td className="p-4 text-gray-600">{userSubject.name}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
