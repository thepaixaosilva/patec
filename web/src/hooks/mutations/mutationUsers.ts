import { useMutation, useQueryClient } from 'react-query'
import { CreateStudent, User } from '@/interfaces/users'
import api from '@/config/api'

const createUser = (user: CreateStudent) => api.post<CreateStudent>('/users', user)

export const useCreateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((user: CreateStudent) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const updateUser = (student: User) => api.put<User>(`/users/${student.id}`, student)

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((student: User) => updateUser(student), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const deleteStudent = (ra: string) => api.delete<User>(`/users/${ra}`)

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((ra: string) => deleteStudent(ra), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
