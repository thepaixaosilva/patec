import api from '@/config/api'  
import { StudentAnswers } from '@/interfaces/studentAnswers'
import { useMutation, useQueryClient } from 'react-query'

const createStudentAnswer = (studentAnswer: StudentAnswers) => api.post<StudentAnswers>('/student-answers', studentAnswer)

export const useCreateStudentAnswer = () => {
  const queryClient = useQueryClient()

  return useMutation((studentAnswer: StudentAnswers) => createStudentAnswer(studentAnswer), {
    onSuccess: () => {
      queryClient.invalidateQueries('studentAnswers')
    }
  })
}