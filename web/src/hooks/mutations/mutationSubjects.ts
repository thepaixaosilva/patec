import { useMutation, useQueryClient } from 'react-query'
import { Subject } from '@/interfaces/subjects'
import api from '@/config/api'

const createSubject = (subject: Subject) => api.post<Subject>('/subjects', subject)

export const useCreateSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subject: Subject) => createSubject(subject), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}

const updateSubject = (subject: Subject) => api.put<Subject>(`/subjects/${subject.subjectId}`, subject)

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subject: Subject) => updateSubject(subject), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}

const deleteSubject = (subjectId: string) => api.delete<Subject>(`/subjects/${subjectId}`)

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subjectId: string) => deleteSubject(subjectId), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}
