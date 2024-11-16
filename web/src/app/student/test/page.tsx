import { Stack, Text } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import Gabarito from '@/components/Gabarito'

export const metadata = {
  title: 'Folha de respostas',
}
const disciplinas = ['Matemática', 'Português', 'História']

export default function Test() {
  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <Stack>
          <Text textStyle="3xl">Folha de Respostas</Text>
        </Stack>
      </div>

      <Gabarito disciplina={disciplinas}></Gabarito>

      <div className="flex items-center justify-center m-4">
        <Button className=" bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600" type="submit">
          Enviar respostas
        </Button>
      </div>
    </div>
  )
}
