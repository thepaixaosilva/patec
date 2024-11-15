import { FaHome } from "react-icons/fa"
import { Button } from '@chakra-ui/react'
import { BsPencil } from "react-icons/bs"
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
     <Link href="/app/home">
     <Button className="ml-4 bg-black text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600">
     <FaHome /> Sair
          </Button>
     </Link>
     <Link href="/app/test">
     <Button className="ml-4 bg-black text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600">
     <BsPencil /> Iniciar prova
          </Button>
     </Link>
     </div>
    </div>
  );
}
