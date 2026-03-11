import { useQuery } from 'react-query'
import { IUserSubject } from '@/interfaces/userSubjects'
import api from '@/config/api'

const fetchUserSubjects = (subjectId: string) => {
  if (!subjectId) {
    throw new Error('subjectId é obrigatório para buscar os usuários relacionados');
  }
  return api.get<IUserSubject[]>(`/user-subject/by-subject?subjectId=${subjectId}`);
}

export default function useUserSubjects(subjectId: string) {
  return useQuery(['user-subject', subjectId], () => fetchUserSubjects(subjectId), {
      enabled: !!subjectId,
      onError: (error) => {
        console.log(error);
      },
      select: (response) => response.data,
    }
  );
}