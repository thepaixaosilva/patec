'use client'
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Fieldset, Stack, Text } from '@chakra-ui/react'

// Configurações constantes
const ANSWER_OPTIONS = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
] as const

// Definição de tipos mais precisos
interface FormStudentAnswersProps {
  subject: string[]
  onUpdate: (answers: Record<string, string>) => void
  numberOfQuestions?: number
}

// Geração dinâmica do esquema de validação
const createFormSchema = (numberOfQuestions: number) =>
  z.object({
    value: z.array(z.string({ message: 'Resposta obrigatória' }).min(1, 'Resposta obrigatória')).length(numberOfQuestions, `Preencha todas as ${numberOfQuestions} questões`),
  })

const FormStudentAnswers: React.FC<FormStudentAnswersProps> = ({ subject = [], onUpdate, numberOfQuestions = 5 }) => {
  // Tipagem e geração dinâmica do esquema de validação
  type FormValues = z.infer<ReturnType<typeof createFormSchema>>
  const formSchema = createFormSchema(numberOfQuestions)

  const {
    // control,
    // handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: new Array(numberOfQuestions).fill(''),
    },
    mode: 'onChange',
  })

  // Observa mudanças nas respostas
  const answers = watch()

  // Função para encontrar questões não respondidas
  const getUnansweredQuestions = () => {
    return answers.value
      .map((answer, index) => (answer === '' ? index + 1 : null)) // Identifica índices vazios
      .filter((question) => question !== null) // Remove nulos
  }

  // Efeito para atualizar o componente pai
  const handleAnswerUpdate = () => {
    const formattedAnswers = answers.value.reduce((acc, answer, index) => {
      acc[`question_${index + 1}`] = answer
      return acc
    }, {} as Record<string, string>)

    onUpdate(formattedAnswers)
  }

  // Atualiza a resposta da questão
  const updateAnswer = (questionIndex: number, answer: string) => {
    const updatedAnswers = [...answers.value]
    updatedAnswers[questionIndex] = answer
    reset({ value: updatedAnswers }) // Atualiza as respostas no formulário
    handleAnswerUpdate() // Chama o efeito para atualizar o componente pai
  }

  // Submissão com validação de questões não respondidas
  // const handleFormSubmit = () => {
  //   const unanswered = getUnansweredQuestions()
  //   if (unanswered.length > 0) {
  //     alert(`Você deixou as seguintes questões sem resposta: ${unanswered.join(', ')}`)
  //   } else {
  //     alert('Respostas enviadas com sucesso!')
  //     // Aqui você pode adicionar lógica para salvar os dados
  //   }
  // }

  return (
    <div>
      <form id={`answersForm-${subject[0]}`} onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 mx-auto w-full max-w-[475px]">
        <Fieldset.Root invalid={!!errors.value}>
          {subject.map((subjectName, subjectIndex) => (
            <div key={subjectIndex} className="mb-6">
              {/* Cabeçalho do formulário */}
              <div className="flex items-center justify-start m-2">
                <Stack>
                  <Text fontWeight="bold" fontSize="lg">
                    {subjectName}
                  </Text>
                </Stack>
              </div>

              {/* Geração dinâmica de questões */}
              {Array.from({ length: numberOfQuestions }).map((_, questionIndex) => (
                <div key={questionIndex} className="flex items-center justify-center mb-4 p-2 border-b">
                  <div className="flex items-center">
                    <p className="mr-4 font-medium">Questão {questionIndex + 1}</p>

                    <div className="space-x-2">
                      {ANSWER_OPTIONS.map((item) => (
                        <Button
                          key={item.value}
                          onClick={() => updateAnswer(questionIndex, item.value)}
                          className={`
                            w-15 h-15 rounded
                            ${answers.value[questionIndex] === item.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
                          `}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mensagem de erro */}
                  {errors.value?.[questionIndex] && (
                    <Text color="red.500" fontSize="sm" className="ml-4">
                      {errors.value[questionIndex]?.message}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          ))}
        </Fieldset.Root>

        {/* Exibição dinâmica de questões não respondidas */}
        {getUnansweredQuestions().length > 0 && (
          <Text color="red.500" fontSize="sm" mt={4}>
            Questões não respondidas: {getUnansweredQuestions().join(', ')}
          </Text>
        )}
      </form>
    </div>
  )
}

export default FormStudentAnswers
