import { useMutation, useQueryClient } from 'react-query'
import { IUserSubject } from '@/interfaces/userSubjects'
import api from '@/config/api'

const createUserSubject = (userSubject: IUserSubject) => api.post<IUserSubject>('/user-subject', userSubject)

export const useCreateUserSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((userSubject: IUserSubject) => createUserSubject(userSubject), {
    onSuccess: () => {
      queryClient.invalidateQueries('user-subjects')
    },
  })
}

const uploadUserSubjectCsv = (file: File, subjectId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subjectId', subjectId);
  console.log("oi")
  return api.post(`/user-subject/upload/${subjectId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadUserSubjectCsv = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ file, subjectId }: { file: File; subjectId: string }) =>
      uploadUserSubjectCsv(file, subjectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-subjects');
      },
      onError: (error) => {
        console.error('Erro ao processar o CSV:', error);
      },
    }
  );
}

const deleteUserSubject = (subjectId: string) => api.delete<IUserSubject>(`/user-subject/${subjectId}`)

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()

  return useMutation((subjectId: string) => deleteUserSubject(subjectId), {
    onSuccess: () => {
      queryClient.invalidateQueries('user-subjects')
    },
  })
}