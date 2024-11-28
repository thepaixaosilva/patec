export interface IUser {
  id: number
  name: string
  ra: string
  email: string
  role: string
  iat: number
  exp: number
}

export interface IStudent {
  id: number
  name: string
  ra: string
  email: string
  role: string
  userSubject: {
    userId: number
    subjectId: string
    userRa: string
  }[]
  answers: {
    id: number
    score: number
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
    answerKey: number
  }[]
}

export interface ICreateStudent {
  name: string
  email: string
  ra: string
  password: string
  role: string
}
