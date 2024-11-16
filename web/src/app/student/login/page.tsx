import { Button, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuUser } from 'react-icons/lu'
import { LiaKeySolid } from 'react-icons/lia'

export const metadata = {
  title: 'Login - Aluno',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Patec</h1>
        <form className="flex flex-col gap-4">
          {/* Campo de Usuário */}
          <InputGroup startElement={<LuUser className="text-gray-500" />}>
            <Input placeholder="Usuário" type="email" className="focus:ring-2 focus:ring-blue-500" />
          </InputGroup>

          {/* Campo de Senha */}
          <InputGroup startElement={<LiaKeySolid className="text-gray-500" />}>
            <Input placeholder="Senha" type="password" className="focus:ring-2 focus:ring-blue-500" />
          </InputGroup>

          {/* Botão de Login */}
          <Button className="bg-blue-500 text-white py-2 rounded-md w-full transition-transform duration-200 hover:scale-105 hover:bg-blue-600" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
