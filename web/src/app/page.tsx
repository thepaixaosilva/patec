'use client'
import React from 'react'
import Link from 'next/link'
import { PiStudentFill, PiBookOpenTextFill } from 'react-icons/pi'
import { RiAdminLine } from 'react-icons/ri'
import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export default function Start() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl p-8 bg-white/80 shadow-2xl rounded-2xl relative border border-gray-100"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <PiBookOpenTextFill className="mx-auto text-blue-600 w-16 h-16 mb-4" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Patec</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          <p className="text-lg text-gray-600 mt-4">Selecione seu tipo de acesso para continuar</p>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Área de Acesso</h2>
          </div>

          <div className="space-y-4">
            <Link href="/student/login" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-4 px-4 text-lg flex items-center justify-center hover:shadow-lg transition-all duration-200 hover:scale-105">
                <PiStudentFill className="mr-2 h-5 w-5" />
                Acesso do Aluno
              </Button>
            </Link>

            <Link href="/coordinator/login" className="block">
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl py-4 px-4 text-lg flex items-center justify-center hover:shadow-lg transition-all duration-200 hover:scale-105">
                <RiAdminLine className="mr-2 h-5 w-5" />
                Acesso do Coordenador
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
