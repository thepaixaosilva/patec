'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IoIosPaper } from 'react-icons/io'
import { LuCheckCircle } from 'react-icons/lu'
import { FaArrowLeft } from 'react-icons/fa'
import { VscDebugStart } from 'react-icons/vsc'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-amber-200 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-11/12 max-w-4xl p-8 bg-white/90 shadow-2xl rounded-2xl border border-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <IoIosPaper className="text-6xl text-amber-600 mb-4" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 mb-2">Avaliação</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-amber-600 mx-auto mb-4"></div>
        </div>

        {/* Regras */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-6">Regras de Avaliação</h2>
          <ul className="text-gray-700 space-y-8">
            {/* Seção 1 */}
            <li>
              <h3 className="text-md font-medium text-gray-800 mb-4">Estrutura das Provas</h3>
              <ul className="pl-6 space-y-3">
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Cada disciplina possui uma prova composta por <b>5 questões de múltipla escolha</b>.
                  </p>
                </li>
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Cada questão apresenta <b>5 alternativas</b>, sendo <b>apenas uma correta</b>.
                  </p>
                </li>
              </ul>
            </li>

            {/* Seção 2 */}
            <li>
              <h3 className="text-md font-medium text-gray-800 mb-4">Realização das Provas</h3>
              <ul className="pl-6 space-y-3">
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Durante a prova, o aluno deve selecionar <b>uma única alternativa por questão</b>.
                  </p>
                </li>
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Apenas <b>uma prova por vez</b> é permitida, sem possibilidade de interrupção.
                  </p>
                </li>
              </ul>
            </li>

            {/* Seção 3 */}
            <li>
              <h3 className="text-md font-medium text-gray-800 mb-4">Pontuação</h3>
              <ul className="pl-6 space-y-3">
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Cada questão correta vale <b>2 pontos</b>, totalizando <b>10 pontos</b> por disciplina.
                  </p>
                </li>
                <li className="flex items-center">
                  <LuCheckCircle className="text-green-500 mr-3 text-xl" />
                  <p>
                    Se a prova for interrompida, o progresso será perdido, exigindo <b>nova realização</b>.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Botões */}
        <div className="flex justify-center mt-10 gap-6">
          <Link href="/">
            <button className="flex items-center justify-center px-6 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 hover:-translate-x-1 transition-transform">
              <FaArrowLeft className="mr-2" />
              Sair
            </button>
          </Link>
          <Link href="/student/test">
            <button className="flex items-center justify-center px-6 py-3 text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-md hover:scale-105 transition-transform">
              <VscDebugStart className="mr-2 text-xl" />
              Iniciar
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
