import api from '@/config/api'  
import { IAnswerKeys } from '@/interfaces/answerKeys'
import { useMutation, useQueryClient } from 'react-query'

const createAnswerKeys = (answerKeys: IAnswerKeys) => api.post<IAnswerKeys>('/answer-keys', answerKeys)

export const useCreateAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((answerKeys: IAnswerKeys) => createAnswerKeys(answerKeys), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}

const updateAnswerKeys = (answerKeys: IAnswerKeys) => api.put<IAnswerKeys>(`/answer-keys/${answerKeys.id}`, answerKeys)

export const useUpdateAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((answerKeys: IAnswerKeys) => updateAnswerKeys(answerKeys), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}

const deleteAnswerKeys = (id: number) => api.delete<IAnswerKeys>(`/answer-keys/${id}`)

export const useDeleteAnswerKeys = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => deleteAnswerKeys(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('answerKeys')
    }
  })
}