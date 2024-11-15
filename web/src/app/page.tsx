import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { PiStudentFill } from 'react-icons/pi'
import { RiAdminLine } from 'react-icons/ri'

export default function Start() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Acessos</h1>
      <div className="border">
        <Link href="/student/login">
          <Button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600">
            <PiStudentFill /> Aluno
          </Button>
        </Link>
        <Link href="/coordinator/login">
          <Button className="m-4 bg-red-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-red-600">
            <RiAdminLine /> Coordenador
          </Button>
        </Link>
      </div>
    </div>
  )
}
