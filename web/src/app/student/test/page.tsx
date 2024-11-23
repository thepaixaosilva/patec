'use client'

import { Stack, Text } from '@chakra-ui/react'
import FormStudentAnswers from '@/components/FormStudentAnswers'

//PENDENTE: puxar as disciplinas que o usuário está matriculado
const subject = ['Matemática']

export default function Test() {
  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <Stack>
          <Text textStyle="3xl">Folha de Respostas</Text>
        </Stack>
      </div>
      <FormStudentAnswers subject={subject}></FormStudentAnswers>
      </div>
  )
}