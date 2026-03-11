import { useQuery } from 'react-query'
import { IStudent } from '@/interfaces/users'
import api from '@/config/api'

const fetchStudents = () => api.get<IStudent[]>('/users/students')

export default function useStudents() {
  return useQuery(['students'], () => fetchStudents(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data,
  })
}
