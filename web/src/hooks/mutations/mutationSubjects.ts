import api from '@/config/api';
import { Subject } from '@/interfaces/subject';

export const addSubject = async (
  newSubject: Subject,
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>,
  onSuccess: () => void
) => {
  try {
    const response = await api.post('/subjects', newSubject);
    setSubjects((prevSubjects) => [...prevSubjects, response.data]);
    onSuccess();
  } catch (error) {
    console.error('Erro ao adicionar disciplina:', error);
  }
};

export const editSubject = async (
  subjectId: string,
  updatedSubject: Subject,
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>,
  onSuccess: () => void
) => {
  try {
    const response = await api.patch(`/subjects/${subjectId}`, updatedSubject);
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.subjectId === subjectId ? response.data : subject
      )
    );
    onSuccess();
  } catch (error) {
    console.error('Erro ao editar disciplina:', error);
  }
};

export const deleteSubject = async (
  subjectId: string,
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>,
  onSuccess: () => void
) => {
  try {
    await api.delete(`/subjects/${subjectId}`);
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject.subjectId !== subjectId)
    );
    onSuccess();
  } catch (error) {
    console.error('Erro ao excluir disciplina:', error);
  }
};
