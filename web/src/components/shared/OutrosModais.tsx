// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Button } from '@chakra-ui/react'
// import Modal from '@/components/shared/Modal'
// import { ITestDay } from '@/interfaces/testDay'
// import { ISubject } from '@/interfaces/subjects'

// interface AnswerKeyModalProps {
//   allTests: ITestDay[]
//   allSubjects: ISubject[]
//   isCreateModalOpen: boolean
//   closeCreateModal: () => void
//   openEditModal: (testId: number) => void
// }

// interface AnswerKeyEditModalProps {
//   selectedTest: ITestDay | null
//   allSubjects: ISubject[]
//   isEditModalOpen: boolean
//   closeEditModal: () => void
//   onSave: (answerKey: any) => void
// }

// const TestSelectionModal: React.FC<AnswerKeyModalProps> = ({ allTests, isCreateModalOpen, closeCreateModal, openEditModal }) => {
//   return (
//     <AnimatePresence>
//       {isCreateModalOpen && (
//         <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal} title="Selecionar Avaliação para Gabarito">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.1 }}
//             className="space-y-6"
//           >
//             <table className="w-full border-collapse">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 text-left">Código</th>
//                   <th className="p-2 text-left">Data</th>
//                   <th className="p-2 text-left">Tipo</th>
//                   <th className="p-2 text-right">Ações</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allTests.map((test) => (
//                   <tr key={test.id} className="hover:bg-blue-50 transition-colors">
//                     <td className="p-2">{test.id}</td>
//                     <td className="p-2">{test.testDate ? new Date(test.testDate).toLocaleDateString() : 'N/A'}</td>
//                     <td className="p-2">{test.testType}</td>
//                     <td className="p-2 text-right">
//                       <Button
//                         onClick={() => {
//                           closeCreateModal()
//                           openEditModal(test.id)
//                         }}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                       >
//                         Criar Gabarito
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </motion.div>
//         </Modal>
//       )}
//     </AnimatePresence>
//   )
// }

// const AnswerKeyEditModal: React.FC<AnswerKeyEditModalProps> = ({ selectedTest, allSubjects, isEditModalOpen, closeEditModal, onSave }) => {
//   const [selectedSubjects, setSelectedSubjects] = useState<number[]>([])
//   const [answerKeys, setAnswerKeys] = useState<{ [subjectId: number]: { [questionNumber: number]: string } }>({})

//   const handleSubjectSelection = (subjectId: number) => {
//     setSelectedSubjects((prev) => (prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]))

//     // Initialize answer key for the subject if not exists
//     if (!answerKeys[subjectId]) {
//       setAnswerKeys((prev) => ({
//         ...prev,
//         [subjectId]: {},
//       }))
//     }
//   }

//   const handleAnswerChange = (subjectId: number, questionNumber: number, answer: string) => {
//     setAnswerKeys((prev) => ({
//       ...prev,
//       [subjectId]: {
//         ...prev[subjectId],
//         [questionNumber]: answer,
//       },
//     }))
//   }

//   const renderSubjectAnswerSection = (subject: ISubject) => {
//     // const totalQuestions = subject.totalQuestions || 10 // Default to 10 if not specified

//     // return (
//     //   <div key={subject.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
//     //     <h3 className="text-xl font-semibold mb-4">{subject.name}</h3>
//     //     <div className="grid grid-cols-5 gap-4">
//     //       {[...Array(totalQuestions)].map((_, index) => (
//     //         <div key={index} className="flex flex-col items-center">
//     //           <label className="mb-2 text-sm">Q{index + 1}</label>
//     //           <select
//     //             value={answerKeys[subject.id]?.[index + 1] || ''}
//     //             onChange={(e) => handleAnswerChange(subject.id, index + 1, e.target.value)}
//     //             className="w-full p-2 border rounded"
//     //           >
//     //             <option value="">-</option>
//     //             <option value="A">A</option>
//     //             <option value="B">B</option>
//     //             <option value="C">C</option>
//     //             <option value="D">D</option>
//     //             <option value="E">E</option>
//     //           </select>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   </div>
//     // )
//   }

//   const handleSubmit = () => {
//     onSave({
//       testId: selectedTest?.id,
//       subjects: selectedSubjects,
//       answerKeys,
//     })
//   }

//   return (
//     <AnimatePresence>
//       {isEditModalOpen && (
//         <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Cadastrar/Editar Gabarito">
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="space-y-6">
//             {/* Test Information Section */}
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <h2 className="text-2xl font-bold mb-2">Informações da Avaliação</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <strong>Código:</strong> {selectedTest?.id}
//                 </div>
//                 <div>
//                   <strong>Data:</strong> {selectedTest?.testDate ? new Date(selectedTest.testDate).toLocaleDateString() : 'N/A'}
//                 </div>
//                 <div>
//                   <strong>Tipo:</strong> {selectedTest?.testType}
//                 </div>
//               </div>
//             </div>

//             {/* Subject Selection */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold mb-4">Selecionar Disciplinas</h2>
//               <div className="flex flex-wrap gap-4">
//                 {allSubjects.map((subject) => (
//                   <label key={subject.id} className="flex items-center">
//                     <input type="checkbox" checked={selectedSubjects.includes(subject.id)} onChange={() => handleSubjectSelection(subject.id)} className="mr-2" />
//                     {subject.name}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Answer Key Sections */}
//             {selectedSubjects.map((subjectId) => {
//               const subject = allSubjects.find((s) => s.id === subjectId)
//               return subject ? renderSubjectAnswerSection(subject) : null
//             })}

//             {/* Action Buttons */}
//             <div className="flex justify-end space-x-4 mt-6">
//               <Button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-200">
//                 Salvar Gabarito
//               </Button>
//               <Button onClick={closeEditModal} className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200">
//                 Cancelar
//               </Button>
//             </div>
//           </motion.div>
//         </Modal>
//       )}
//     </AnimatePresence>
//   )
// }

// export { TestSelectionModal, AnswerKeyEditModal }
