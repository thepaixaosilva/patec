import { useMutation, useQueryClient } from 'react-query'
import { ISubject } from '@/interfaces/subjects'
import api from '@/config/api'

const createSubject = (subject: ISubject) => api.post<ISubject>('/subjects', subject)

export const useCreateSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subject: ISubject) => createSubject(subject), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}

const updateSubject = (subject: ISubject) => api.put<ISubject>(`/subjects/${subject.subjectId}`, subject)

export const useUpdateSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subject: ISubject) => updateSubject(subject), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}

const deleteSubject = (subjectId: string) => api.delete<ISubject>(`/subjects/${subjectId}`)

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subjectId: string) => deleteSubject(subjectId), {
    onSuccess: () => {
      queryClient.invalidateQueries('subjects')
    },
  })
}
