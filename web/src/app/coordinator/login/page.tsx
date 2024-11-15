import { Button, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { LuUser } from 'react-icons/lu'
import { LiaKeySolid } from 'react-icons/lia'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">-- Patec --</h1>
      <form className="flex flex-col items-center justify-center border p-5 gap-2">
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Usuário" type="email"></Input>
        </InputGroup>
        <InputGroup flex="1" startElement={<LiaKeySolid />}>
          <Input placeholder="Senha" type="password"></Input>
        </InputGroup>
        <Button className="bg-green-500 text-white px-2 py-2 rounded w-40 hover:scale-105 hover:bg-green-600">Entrar</Button>
      </form>
    </div>
  )
}
