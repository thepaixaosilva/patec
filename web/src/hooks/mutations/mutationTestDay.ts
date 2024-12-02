import { useMutation, useQueryClient } from 'react-query'
import api from '@/config/api'
import { ICreateTestDay } from '@/interfaces/testDay'

const createTestDay = (testDay: FormData) => {
  return api.post<ICreateTestDay>('/test-days', testDay, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const useCreateTestDay = () => {
  const queryClient = useQueryClient()

  return useMutation((testDay: FormData) => createTestDay(testDay), {
    onSuccess: () => {
      queryClient.invalidateQueries('testDays')
    },
  })
}

const updateTestDay = (testDayId: number, testDay: FormData) =>
  api.put<ICreateTestDay>(`/test-days/${testDayId}`, testDay, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const useUpdateTestDay = () => {
  const queryClient = useQueryClient()

  return useMutation(({ testDayId, testDay }: { testDayId: number; testDay: FormData }) => updateTestDay(testDayId, testDay), {
    onSuccess: () => {
      queryClient.invalidateQueries('testDays')
    },
  })
}

const deleteTestDay = (testDayId: number) => api.delete(`/test-days/${testDayId}`)

export const useDeleteTestDay = () => {
  const queryClient = useQueryClient()

  return useMutation((testDayId: number) => deleteTestDay(testDayId), {
    onSuccess: () => {
      queryClient.invalidateQueries('testDays')
    },
  })
}
