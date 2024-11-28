export interface IAnswerKeys {
    id?: number
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
    testDay: number //id da avaliação vinculada
    subjectId: number //id da disciplina
    // studentAnswers?: number //id das respostas dos usuários vinculados ao gabarito
}