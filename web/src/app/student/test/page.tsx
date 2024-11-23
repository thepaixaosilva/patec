'use client'

import { Stack, Text } from '@chakra-ui/react'
import StudentAnswers from '@/components/StudentAnswers'

/*aqui precisa puxar as disciplinas que o usuário está matriculado*/
const subject = ['Matemática']

export default function Test() {
  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <Stack>
          <Text textStyle="3xl">Folha de Respostas</Text>
        </Stack>
      </div>
      <StudentAnswers subject={subject}></StudentAnswers>
      </div>
  )
}