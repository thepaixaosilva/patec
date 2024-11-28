import { useQuery } from 'react-query'
import api from '@/config/api'  
import { IStudentAnswers } from '@/interfaces/studentAnswers'

const fetchStudentAnswers = () => api.get<IStudentAnswers[]>('/student-answers')

export default function useStudentAnswers() {
  return useQuery(['/studentAnswers'], () => fetchStudentAnswers(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data
  })
}