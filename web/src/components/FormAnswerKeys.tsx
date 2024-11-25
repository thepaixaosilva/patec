import { Button, Fieldset, HStack, Link } from '@chakra-ui/react'
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTrigger } from './ui/dialog'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Stack, Text } from '@chakra-ui/react'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Alert } from './ui/alert'
import { CloseButton } from './ui/close-button'
import { useCreateAnswerKeys, useUpdateAnswerKeys } from '@/hooks/mutations/mutationAnswerKeys'
import useAnswerKeys from '@/hooks/queries/useAnswerKeys'
import { Subjects } from '@/app/coordinator/manage_anwer_keys/page'

interface HeaderProps {
  subjects: Subjects[],
  testId: number,
}

const items = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
]

const formSchema = z.object({
  value: z.array(z.string({ message: 'Obrigatório' })),
})
type FormValues = z.infer<typeof formSchema>

const FormAnswerKeys: React.FC<HeaderProps> = ({ subjects= [], testId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const handleDialogClose = () => setIsDialogOpen(false)

  const subjectsName = subjects.map((subject) => subject.name)
  const subjectsId = subjects.map((subject) => subject.id)
  
  const {
    reset,
    control,
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [] },
  })

  const { mutate: createAnswerKeys, isError } = useCreateAnswerKeys()
  const { mutate: updateAnswerKeys } = useUpdateAnswerKeys()
  const { data: savedAnswers, } = useAnswerKeys(testId)

   useEffect(() => {
    if (savedAnswers) {
      const initialValues = subjectsId.flatMap((subjectId) => {
        const answerSet = savedAnswers.find((answer) => answer.subjectId === subjectId)
        return [
          answerSet?.answer1,
          answerSet?.answer2,
          answerSet?.answer3,
          answerSet?.answer4,
          answerSet?.answer5,
        ]
      })
      reset({ value: initialValues })
    }
  }, [savedAnswers, reset, subjectsId])

  const onSubmit = handleSubmit((data) => {
    const groupedData = subjectsId.map((subjectsId, index) => {
      const subjectAnswers = data.value.slice(index * 5, (index + 1) * 5);
      return [subjectsId, ...subjectAnswers]
    })

    for (const subjectData of groupedData) {
      const [subjectsId, ...answers] = subjectData
      const answerKeysExists = Array.isArray(savedAnswers) ? savedAnswers.find((answer) => 
        answer.subjectId === subjectsId) : null
      
      const payload = {
        answer1: String(answers[0]),
        answer2: String(answers[1]),
        answer3: String(answers[2]),
        answer4: String(answers[3]),
        answer5: String(answers[4]),
        testDay: Number(testId),
        subjectId: Number(subjectsId),
      }

      if (answerKeysExists?.id) {
        updateAnswerKeys({
          id: answerKeysExists.id, 
          ...payload 
        })
      } else {
      createAnswerKeys(payload, {
        onSuccess: () => {
          console.log(`Gabarito oficial da disciplina ${subjectsId} cadastrado com sucesso!`)
        },
        onError: (error) => {
          console.error(`Erro ao cadastrar gabarito da disciplina ${subjectsId}:`, error)
        }
      })
      }
      if (!isError) {
        reset()
      }
    }
    setIsDialogOpen(false)
    setIsAlertVisible(true)
  })

  return (
    <div>
      <form id="answersForm" onSubmit={onSubmit} className="flex flex-col gap-4 mx-auto w-[475px]">
        <Fieldset.Root invalid={!!errors.value}>

          {subjects.map((__, subjectIndex) => (
            <div key={subjectIndex} className="mb-6">
              <div className="flex items-center justify-start m-2">
                <Stack>
                  <Text fontWeight="bold" fontSize="lg">
                    {subjectsName[subjectIndex]}
                  </Text>
                </Stack>
              </div>

              {Array.from({ length: 5 }).map((_, questionIndex) => (
                <div key={questionIndex} className="flex">
                  <div className="flex items-center justify-center m-2">
                    <div className="mr-6">
                      <p>Questão {questionIndex + 1}</p>
                    </div>
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
            <DialogRoot open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded w-40 hover:scale-105 hover:bg-blue-600" variant="outline">
                  Enviar respostas
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader></DialogHeader>
                <DialogBody>
                  <p>Deseja enviar suas respostas?</p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button size="md" variant="outline" onClick={handleDialogClose}>
                      Cancelar
                    </Button>
                  </DialogActionTrigger>
                  <Button type="submit" form="answersForm" bg="black" color="white" w="75px" h="35px" onClick={handleDialogClose}>
                    Enviar
                  </Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </div>
        </Fieldset.Root>
      </form>

      {isAlertVisible && (
        <Alert status="success" variant="subtle" borderRadius="md" mb={4}
          position="fixed"
          top="10%"
          left="50%"
          transform="translateX(-50%)"
          zIndex={9999}
          maxWidth="500px"
          height="80px">
          Formulário enviado com sucesso!
          <Link href="/student/home">
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setIsAlertVisible(false)} />
          </Link>
        </Alert>
      )}
    </div>
  )
}

export default FormAnswerKeys