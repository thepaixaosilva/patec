export interface ICreateTestDay {
  id: number
  testDate: Date
  testType: string
  file: File | null
}

export interface ITestDay {
  id: number
  testDate: Date
  testType: string
  filePath: string
}
