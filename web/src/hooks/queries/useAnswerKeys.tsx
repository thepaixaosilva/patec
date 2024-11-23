import { useQuery } from 'react-query'
import api from '@/config/api'  
import { AnswerKeys } from '@/interfaces/answerKeys'

const fetchAnswerKeys = () => api.get<AnswerKeys[]>('/answer-keys')

//implementei possibilidade de filtrar o get pelo id da avaliação
export default function useAnswerKeys(testId?: number) {
  return useQuery(['/answerKeys', testId], () => fetchAnswerKeys(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => {
      const data = response.data
      return testId ? data.filter((answer) => answer.testDay === testId) : data;
    }
  })
}