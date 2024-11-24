import { useMutation, useQueryClient } from 'react-query'
import { CreateUser, User } from '@/interfaces/users'
import api from '@/config/api'

const createUser = (user: CreateUser) => api.post<CreateUser>('/user', user)

export const useCreateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((user: CreateUser) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const updateUser = (student: User) => api.put<User>(`/user/${student.id}`, student)

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((student: User) => updateUser(student), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const deleteStudent = (id: number) => api.delete<User>(`/user/${id}`)

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => deleteStudent(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
