'use client'
import { FaRegFilePdf, FaArrowLeft } from 'react-icons/fa6'
import { Button, Input } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { PiStudentFill } from 'react-icons/pi'
import { GiBookCover } from 'react-icons/gi'
import Modal from '@/components/shared/Modal'
import React from 'react'

interface ReportBySubject {
  ra: string
  name: string
  subjectId: string
  subjectName: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  answer5: string
  score: number
}

export default function Home() {
  const [data, setData] = useState<ReportBySubject[]>([
    {
      ra: '1010101',
      name: 'João Silva',
      subjectId: 'ADM0000',
      subjectName: 'Administração',
      answer1: 'C',
      answer2: 'A',
      answer3: 'A',
      answer4: 'D',
      answer5: 'C',
      score: 6,
    },
    {
      ra: '2020202',
      name: 'Maria Santos',
      subjectId: 'ADM0000',
      subjectName: 'Administração',
      answer1: 'B',
      answer2: 'A',
      answer3: 'C',
      answer4: 'D',
      answer5: 'A',
      score: 7,
    },
  ])

  const [students, setStudents] = useState(
    Array.from(
      new Map(
        [
          { ra: '1010101', name: 'João Silva', email: 'joao@email.com' },
          { ra: '2020202', name: 'Maria Santos', email: 'maria@email.com' },
          { ra: '3030303', name: 'Pedro Oliveira', email: 'pedro@email.com' },
        ].map((student) => [student.ra, student]) // Usa RA como chave para garantir unicidade
      ).values()
    )
  )

  const [subjects, setSubjects] = useState(
    Array.from(
      new Map(
        [
          { subjectId: 'ADM0000', name: 'Administração', semester: 1 },
          { subjectId: 'ECO0000', name: 'Economia', semester: 2 },
          { subjectId: 'MAT0000', name: 'Matemática', semester: 1 },
        ].map((subject) => [subject.subjectId, subject]) // Usa subjectId como chave para garantir unicidade
      ).values()
    )
  )

  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [filteredData, setFilteredData] = useState<ReportBySubject[]>([])
  const [reportType, setReportType] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModalType, setCurrentModalType] = useState<'student' | 'subject' | null>(null)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (selectedValue) {
      const filteredData = reportType === 'subject' ? data.filter((item) => item.subjectId === selectedValue) : data.filter((item) => item.ra === selectedValue)
      setFilteredData(filteredData)
    }
  }, [selectedValue, reportType])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }

  const handleSelect = (value: string): void => {
    setSelectedValue(value)
    setReportType(currentModalType)
    setIsModalOpen(false)
  }

  const handleSelection = (type: 'student' | 'subject'): void => {
    setCurrentModalType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSearchValue('')
  }

  const handleButtonClick = () => {
    alert('Botão clicado!')
  }

  // eslint-disable-next-line react/display-name
  const SelectionModal = React.memo(() => {
    const title = currentModalType === 'student' ? 'Selecionar Aluno' : 'Selecionar Disciplina'
    const placeholder = currentModalType === 'student' ? 'Buscar por RA ou nome...' : 'Buscar por código ou nome...'

    const filteredItems =
      currentModalType === 'student'
        ? students.filter((student) => student.ra.toLowerCase().includes(searchValue.toLowerCase()) || student.name.toLowerCase().includes(searchValue.toLowerCase()))
        : subjects.filter((subject) => subject.subjectId.toLowerCase().includes(searchValue.toLowerCase()) || subject.name.toLowerCase().includes(searchValue.toLowerCase()))

    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={title}>
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
          />

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {currentModalType === 'student' ? (
                    <>
                      <th className="p-4 text-start text-lg font-semibold text-gray-700">RA</th>
                      <th className="p-4 text-start text-lg font-semibold text-gray-700">Nome</th>
                      <th className="p-4 text-start text-lg font-semibold text-gray-700">Email</th>
                    </>
                  ) : (
                    <>
                      <th className="p-4 text-start text-lg font-semibold text-gray-700">Código</th>
                      <th className="p-4 text-start text-lg font-semibold text-gray-700">Nome</th>
                      <th className="p-4 text-center text-lg font-semibold text-gray-700">Semestre</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-amber-50 cursor-pointer transition-colors duration-150"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => handleSelect(currentModalType === 'student' ? (item as any).ra : (item as any).subjectId)}
                  >
                    {currentModalType === 'student' ? (
                      <>
                        <td className="p-4 font-medium text-gray-700">{(item as any).ra}</td>
                        <td className="p-4 text-gray-600">{(item as any).name}</td>
                        <td className="p-4 text-gray-600">{(item as any).email}</td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 font-medium text-gray-700">{(item as any).subjectId}</td>
                        <td className="p-4 text-gray-600">{(item as any).name}</td>
                        <td className="p-4 text-center">
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">{(item as any).semester}º Semestre</span>
                        </td>
                      </>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    )
  })

  const baseButtonClasses = 'flex flex-col items-center justify-center text-white px-6 py-4 rounded-xl size-64 transition-transform duration-300 hover:scale-105 hover:shadow-2xl'

  const renderSubjectReportTable = () => {
    // Agrupa dados por disciplina
    const groupedData = data.reduce((acc, curr) => {
      acc[curr.subjectId] = acc[curr.subjectId] || []
      acc[curr.subjectId].push(curr)
      return acc
    }, {} as Record<string, ReportBySubject[]>)

    return (
      <>
        {Object.entries(groupedData).map(([subjectId, students]) => (
          <div key={subjectId} className="mb-8">
            <div className="bg-blue-50 p-4 rounded-t-xl mb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Disciplina:</span>
                  <span className="text-gray-600">{students[0].subjectName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700">Código:</span>
                  <span className="text-gray-600">{subjectId}</span>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-b-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="p-4 text-start text-lg font-semibold text-gray-700">RA</th>
                    <th className="p-4 text-start text-lg font-semibold text-gray-700">Nome</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">R.1</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">R.2</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">R.3</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">R.4</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">R.5</th>
                    <th className="p-4 text-center text-lg font-semibold text-gray-700">Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <td className="p-4 font-medium text-gray-700">{student.ra}</td>
                      <td className="p-4 text-gray-600">{student.name}</td>
                      <td className="p-4 text-center text-gray-600">{student.answer1}</td>
                      <td className="p-4 text-center text-gray-600">{student.answer2}</td>
                      <td className="p-4 text-center text-gray-600">{student.answer3}</td>
                      <td className="p-4 text-center text-gray-600">{student.answer4}</td>
                      <td className="p-4 text-center text-gray-600">{student.answer5}</td>
                      <td className={`p-4 text-center font-bold ${student.score >= 6 ? 'text-green-600' : 'text-red-600'}`}>{student.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 via-amber-200 to-orange-200 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={reportType || 'selection'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`${!reportType ? 'w-5/12' : 'w-11/12'} max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100`}
        >
          {reportType ? (
            <div className="flex justify-between items-center mb-6">
              <Button
                className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1"
                onClick={() => setReportType(null)}
              >
                <FaArrowLeft size={24} />
                Voltar para Seleção
              </Button>
            </div>
          ) : (
            <Link href="/coordinator/dashboard">
              <Button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1">
                <FaArrowLeft size={24} />
                Voltar
              </Button>
            </Link>
          )}

          <div className="flex flex-col items-center mb-8">
            <HiOutlineDocumentReport className="text-6xl text-amber-600 mb-4" />
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Relatório</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" />
          </div>

          {reportType === 'subject' ? (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                <div className="flex justify-end items-start mb-8">
                  <Button
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold flex items-center gap-2 hover:scale-105"
                    onClick={handleButtonClick}
                  >
                    <FaRegFilePdf />
                    Gerar PDF
                  </Button>
                </div>
                {renderSubjectReportTable()}
              </motion.div>
            </>
          ) : reportType === 'student' ? (
            <>
              <div className="flex justify-end items-start mb-8">
                <Button
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 text-lg font-semibold flex items-center gap-2 hover:scale-105"
                  onClick={handleButtonClick}
                >
                  <FaRegFilePdf />
                  Gerar PDF
                </Button>
              </div>
              <div className="bg-blue-50 p-4 rounded-t-xl mb-0">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700">Curso:</span>
                    <span className="text-gray-600">Gestão Empresarial EaD</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700">RA:</span>
                    <span className="text-gray-600">1010101</span>
                  </div>
                </div>
              </div>
              {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl">
                  <p className="text-xl text-center">Nenhum dado disponível.</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-b-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <table className="w-full border-collapse">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="p-4 text-start text-lg font-semibold text-gray-700">Cód. Disciplina</th>
                        <th className="p-4 text-start text-lg font-semibold text-gray-700">Nome da Disciplina</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">R.1</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">R.2</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">R.3</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">R.4</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">R.5</th>
                        <th className="p-4 text-center text-lg font-semibold text-gray-700">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((report, index) => (
                        <motion.tr
                          key={index}
                          className="hover:bg-blue-50/50 transition-colors duration-150"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.1 }}
                        >
                          <td className="p-4 font-medium text-gray-700">{report.subjectId}</td>
                          <td className="p-4 text-gray-600">{report.subjectName}</td>
                          <td className="p-4 text-center text-gray-600">{report.answer1}</td>
                          <td className="p-4 text-center text-gray-600">{report.answer2}</td>
                          <td className="p-4 text-center text-gray-600">{report.answer3}</td>
                          <td className="p-4 text-center text-gray-600">{report.answer4}</td>
                          <td className="p-4 text-center text-gray-600">{report.answer5}</td>
                          <td className={`p-4 text-center font-bold ${report.score >= 6 ? 'text-green-600' : 'text-red-600'}`}>{report.score}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center gap-8 my-12"
            >
              <Button className={`${baseButtonClasses} bg-amber-600 hover:bg-amber-800`} onClick={() => handleSelection('student')}>
                <PiStudentFill className="mb-5 size-28" />
                <h2 className="text-xl font-semibold text-center">
                  Relatório
                  <br />
                  por Aluno
                </h2>
              </Button>

              <Button className={`${baseButtonClasses} bg-amber-600 hover:bg-amber-800`} onClick={() => handleSelection('subject')}>
                <GiBookCover className="mb-5 size-28" />
                <h2 className="text-xl font-semibold text-center">
                  Relatório
                  <br />
                  por Disciplina
                </h2>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <SelectionModal />
    </div>
  )
}
