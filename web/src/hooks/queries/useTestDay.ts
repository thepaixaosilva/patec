import { useQuery } from 'react-query'
import { ITestDay } from '@/interfaces/testDay'
import api from '@/config/api'

const fetchTestDays = () => api.get<ITestDay[]>('/test-days')

export default function useTestDays() {
  return useQuery(['testDays'], () => fetchTestDays(), {
    onError: (error) => {
      console.log(error)
    },
    select: (response) => response.data,
  })
}
