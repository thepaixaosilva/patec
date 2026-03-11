import { useMutation, useQueryClient } from 'react-query'
import { ICreateStudent, IUser } from '@/interfaces/users'
import api from '@/config/api'

const createUser = (user: ICreateStudent) => api.post<ICreateStudent>('/users', user)

export const useCreateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((user: ICreateStudent) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const updateUser = (student: IUser) => api.put<IUser>(`/users/${student.ra}`, student)

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((student: IUser) => updateUser(student), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}

const deleteStudent = (ra: string) => api.delete<IUser>(`/users/${ra}`)

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()

  return useMutation((ra: string) => deleteStudent(ra), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
