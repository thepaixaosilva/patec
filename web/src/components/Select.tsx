'use client'

import { createListCollection } from '@chakra-ui/react'
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setTestType: (value: string) => void // Função para atualizar o estado
}

export default function SelectType({ setTestType }: Props) {
  const frameworks = createListCollection({
    items: [
      { label: '1º Bimestre (sábado)', value: '1BSb' },
      { label: '1º Bimestre (segunda-feira)', value: '1BSg' },
      { label: '2º Bimestre (sábado)', value: '2BSb' },
      { label: '2º Bimestre (segunda-feira)', value: '2BSg' },
      { label: 'Final', value: 'final' },
    ],
  })

  return (
    <SelectRoot collection={frameworks} className="border border-gray-200 p-3 text-lg w-full rounded-xl focus:ring-2 focus:ring-blue-500">
      <SelectTrigger>
        <SelectValueText placeholder="Selecionar" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {frameworks.items.map((type) => (
          <SelectItem
            onClick={() => setTestType(type.value)} // Atualiza o valor via o setter
            className="hover:bg-purple-300"
            item={type}
            key={type.value}
          >
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
