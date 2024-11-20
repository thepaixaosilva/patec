import { useEffect, useState } from 'react'
import api from '@/config/api'

interface Subject {
  subjectId: string
  name: string
  semester: number
}

export default function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    api.get('/subjects').then((response) => {
      setSubjects(response.data)
    })
  }, [])

  return { subjects, setSubjects }
}
