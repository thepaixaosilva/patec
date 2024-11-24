'use client'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import { Button, List } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoIosPaper } from 'react-icons/io'
import { LuCheckCircle } from 'react-icons/lu'
import { VscDebugStart } from 'react-icons/vsc'

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-amber-200 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-11/12 max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100"
        >
          <div className="flex flex-col items-center mb-12">
            <IoIosPaper className="text-6xl text-red-600 mb-4" />
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Avaliação!</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <List.Root gap="2" variant="plain" align="center">
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                Cada disciplina possui uma prova com 5 questões de múltipla escolha
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                Cada questão possui 5 alternativas, sendo apenas uma a correta
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                Durante a realização da prova, o aluno selecionará uma, e somente uma alternativa por questão
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                Cada questão correta equivale a 2 pontos, totalizando uma nota máxima de 10 pontos por disciplina
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                As provas da segunda chamada são compostas por questões diferentes das provas da primeira chamada
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                O aluno não poderá acessar as avaliações fora das datas de realização destas
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                O aluno não poderá acessar as avaliações fora da instituição
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                O aluno pode realizar apenas uma prova por vez, sem poder interrompê-la no meio da execução
              </List.Item>
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCheckCircle />
                </List.Indicator>
                Se uma prova é interrompida no meio, o aluno perde seu progresso, tendo que realizá-la novamente
              </List.Item>
            </List.Root>
            <div className='flex justify-center mt-8'>
              {/* Botão para prova */}
              <Link href="/./student/test">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 mb-8 text-lg font-semibold flex items-center gap-2 hover:scale-105">
                  <VscDebugStart size={24} />
                  Iniciar
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-10">
              {/* Botão de retorno */}
              <Link href="/" className="absolute left-8 top-8">
                <Button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-200 hover:-translate-x-1">
                  <FaArrowLeft size={24} />
                  Início
                </Button>
                <div />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
  )
}
