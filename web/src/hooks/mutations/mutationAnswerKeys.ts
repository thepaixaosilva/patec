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

const updateAnswerKeys = (answerKeys: AnswerKeys) => api.put<AnswerKeys>(`/answer-keys/${answerKeys.id}`, answerKeys)

export const useUpdateAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((answerKeys: AnswerKeys) => updateAnswerKeys(answerKeys), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}

const deleteAnswerKeys = (id: number) => api.delete<AnswerKeys>(`/answer-keys/${id}`)

export const useDeleteAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => deleteAnswerKeys(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}