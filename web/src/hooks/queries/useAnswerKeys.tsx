import { useQuery } from 'react-query'
import api from '@/config/api'  
import { AnswerKeys } from '@/interfaces/answerKeys'

const fetchAnswerKeys = () => api.get<AnswerKeys[]>('/answer-keys')

export default function useAnswerKeys() {
  return useQuery(['/answerKeys'], () => fetchAnswerKeys(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data
  })
}