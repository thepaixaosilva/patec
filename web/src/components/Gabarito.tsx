import React from 'react'
import { HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Stack, Text } from '@chakra-ui/react'

interface HeaderProps {
  disciplina: string[]
}

const Gabarito: React.FC<HeaderProps> = ({ disciplina = [] }) => {
  return (
    <div>
      {disciplina.map((element) => (
        <form className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-center m-4">
              <Stack>
                <Text textStyle="1xl">{element}</Text>
              </Stack>
            </div>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center justify-center m-6">
                <h2 className="mr-10">Questão {i + 1}</h2>
                <RadioGroup>
                  <HStack gap="6">
                    <Radio value="1">A</Radio>
                    <Radio value="2">B</Radio>
                    <Radio value="3">C</Radio>
                    <Radio value="4">D</Radio>
                    <Radio value="5">E</Radio>
                  </HStack>
                </RadioGroup>
              </div>
            ))}
          </div>
        </form>
      ))}
    </div>
  )
}

export default Gabarito