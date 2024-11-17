"use client"
import { Button, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuUser } from 'react-icons/lu'
import { LiaKeySolid } from 'react-icons/lia'
import { motion } from 'framer-motion'

// export const metadata = {
//   title: 'Login - Aluno',
//   icons: {
//     icon: '/favicon.ico',
//   },
// }

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Patec</h1>
        <form className="flex flex-col gap-4">
          {/* Campo de Usuário */}
          <InputGroup startElement={<LuUser className="text-gray-500" />}>
            <Input
              placeholder="Usuário"
              type="email"
              className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </InputGroup>

          {/* Campo de Senha */}
          <InputGroup startElement={<LiaKeySolid className="text-gray-500" />}>
            <Input
              placeholder="Senha"
              type="password"
              className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </InputGroup>

          {/* Botão de Login */}
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl w-full transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
