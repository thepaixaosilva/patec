'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
import Answersheet from '@/components/Answersheet'

/*export const metadata = {
  title: 'Folha de respostas',
}*/

const subject = ['Matemática', 'Português', 'História']

export default function Test() {
  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <Stack>
          <Text textStyle="3xl">Folha de Respostas</Text>
        </Stack>
      </div>
      <Answersheet subject={subject}></Answersheet>
      </div>
  )
}
