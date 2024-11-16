import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import { BsPencil } from 'react-icons/bs'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { List } from '@chakra-ui/react'
import { Blockquote } from '@/components/ui/blockquote'

export const metadata = {
  title: 'Home do Estudante',
  description: 'Bem-vindo à página inicial do estudante.',
}

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Text fontSize="80px" fontWeight="bold" fontFamily="cursive" color="gray.800">
          BOA PROVA!
        </Text>
      </div>
      <div className="flex flex-col items-center justify-center">
        <List.Root>
          <List.Item>AO CLICAR EM "INICIAR PROVA", VOCÊ SERÁ DIRECIONADO A UM GABARITO. PREENCHA COM CUIDADO ANTES DE CLICAR EM ENVIAR!</List.Item>
          <List.Item>Add informação...</List.Item>
          <List.Item>Add informação...</List.Item>
          <List.Item>BOA PROVA!</List.Item>
        </List.Root>
        <Image
        src="https://img.freepik.com/premium-vector/cute-girl-children-student-uniforms-cat-study-sleepy-kawaii-cartoon-illustration_493693-111.jpg"
        alt="Imagem 1"
        width={300}
        height={200}
        className="rounded-lg border-4 border-white"
      />
       
        <div />

        <div className="flex items-center justify-center">
          <Link href="/.">
            <Button className="ml-4 bg-red-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600">
              <FaHome /> Sair
            </Button>
          </Link>
          <Link href="/student/test">
            <Button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600">
              <BsPencil /> Iniciar prova
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
