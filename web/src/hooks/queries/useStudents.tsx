import { useQuery } from 'react-query'
import { Student } from '@/interfaces/users'
import api from '@/config/api'

const fetchStudents = () => api.get<Student[]>('/users/students')

export default function useStudents() {
  return useQuery(['students'], () => fetchStudents(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data,
  })
}
