import { useQuery } from 'react-query'
import api from '@/config/api'  
import { StudentAnswers } from '@/interfaces/studentAnswers'

const fetchStudentAnswers = () => api.get<StudentAnswers[]>('/student-answers')

export default function useStudentAnswers() {
  return useQuery(['/studentAnswers'], () => fetchStudentAnswers(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data
  })
}