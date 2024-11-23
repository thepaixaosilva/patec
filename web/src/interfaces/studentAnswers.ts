export interface StudentAnswers {
    id: number
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
    user?: number //id do usuário
    answerKey?: number //id do gabarito oficial
    //aqui, precisa puxar o answerkey com base na disciplina e no dia da avaliação
}