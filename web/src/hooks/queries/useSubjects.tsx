import { useQuery } from 'react-query'
import { Subject } from '@/interfaces/subjects'
import api from '@/config/api'

const fetchSubjects = () => api.get<Subject[]>('/subjects')

export default function useSubjects() {
  return useQuery(['subjects'], () => fetchSubjects(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data,
  })
}
