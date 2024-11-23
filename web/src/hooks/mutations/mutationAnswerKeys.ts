import api from '@/config/api'  
import { AnswerKeys } from '@/interfaces/answerKeys'
import { useMutation, useQueryClient } from 'react-query'

const createAnswerKeys = (answerKeys: AnswerKeys) => api.post<AnswerKeys>('/answer-keys', answerKeys)

export const useCreateAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((answerKeys: AnswerKeys) => createAnswerKeys(answerKeys), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}