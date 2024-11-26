import { useEffect, useState } from 'react'
import api from '@/config/api'
import { Subject } from "../../interfaces/subject"

export default function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get('/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchSubjects();
  }, [])

  return { subjects, setSubjects }
}
