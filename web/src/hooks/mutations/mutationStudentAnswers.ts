import api from '@/config/api'
import { IStudentAnswers } from '@/interfaces/studentAnswers'
import { useMutation, useQueryClient } from 'react-query'

// Modify the submission type to match the interface
interface StudentAnswerSubmission {
  subjectId: string
  testDate: string
  studentAnswers: Omit<IStudentAnswers, 'id' | 'score' | 'answerKey'>
}

const createStudentAnswer = (data: StudentAnswerSubmission) => api.post(`/student-answers/${data.subjectId}/${data.testDate}`, data.studentAnswers)

export const useCreateStudentAnswer = () => {
  const queryClient = useQueryClient()
  return useMutation(createStudentAnswer, {
    onSuccess: () => {
      queryClient.invalidateQueries('studentAnswers')
    },
    onError: (error) => {
      console.error('Submission failed', error)
    },
  })
}
