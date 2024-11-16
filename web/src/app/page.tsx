import React from 'react'
import Link from 'next/link'
import { PiStudentFill, PiBookOpenTextFill } from 'react-icons/pi'
import { RiAdminLine } from 'react-icons/ri'

export default function Start() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <PiBookOpenTextFill className="mx-auto text-blue-600 w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Patec</h1>
        <p className="text-gray-600">Selecione seu tipo de acesso para continuar</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Área de Acesso</h2>
        </div>

        <div className="space-y-4">
          <Link href="/student/login" className="block">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-4 px-4 text-lg flex items-center justify-center transition-colors duration-200">
              <PiStudentFill className="mr-2 h-5 w-5" />
              Acesso do Aluno
            </button>
          </Link>

          <Link href="/coordinator/login" className="block">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-4 px-4 text-lg flex items-center justify-center transition-colors duration-200">
              <RiAdminLine className="mr-2 h-5 w-5" />
              Acesso do Coordenador
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
