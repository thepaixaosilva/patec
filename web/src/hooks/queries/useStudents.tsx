import { useQuery } from 'react-query'
import { User } from '@/interfaces/users'
import api from '@/config/api'

const fetchStudents = () => api.get<User[]>('/users')

export default function useStudents() {
  return useQuery(['students'], () => fetchStudents(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data,
  })
}
