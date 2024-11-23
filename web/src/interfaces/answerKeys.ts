export interface AnswerKeys {
    //id: number > vai ser gerado automático no banco
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
    testDay: number //id da avaliação vinculada
    subject: string
    studentAnswers?: number //id das respostas dos usuários vinculados ao gabarito
}