import { Button, Fieldset, HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Stack, Text } from '@chakra-ui/react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface HeaderProps {
  subject: string[]
}

const items = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
]

const formSchema = z.object({
  value: z.array(z.string({ message: "Obrigatório" })),
})

type FormValues = z.infer<typeof formSchema>

const Answersheet: React.FC<HeaderProps> = ({ subject = [] }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [] },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mx-auto w-[450px]">
      <Fieldset.Root invalid={!!errors.value}>
        {subject.map((element, subjectIndex) => (
          <div key={subjectIndex} className="mb-6">
            <div className="flex items-center justify-start m-2">
              <Stack>
                <Text  fontWeight="bold" fontSize="lg">{element}</Text>
              </Stack>
            </div>

            {Array.from({ length: 5 }).map((_, questionIndex) => (
              <div key={questionIndex} className="flex">
                <div className="flex items-center justify-center m-2">
                  <Fieldset.Legend>Questão {questionIndex + 1}</Fieldset.Legend>
                  <Controller
                    name={`value.${subjectIndex * 5 + questionIndex}`}
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value)
                        }}
                      >
                        <HStack gap="6">
                          {items.map((item) => (
                            <Radio key={item.value} value={item.value}>
                              {item.label}
                            </Radio>
                          ))}
                        </HStack>
                      </RadioGroup>
                    )}
                  />
                </div>

                {errors.value?.[subjectIndex * 5 + questionIndex]?.message && (
                  <div className="justify-end max-w-[150px]">
                    <Text color="red.500" fontSize="sm" mt={2}>
                      {errors.value[subjectIndex * 5 + questionIndex]?.message}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-center m-4">
          <Button className=" bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600" type="submit">
            Enviar respostas
          </Button>
        </div>
      </Fieldset.Root>
    </form>
  )
}
export default Answersheet
