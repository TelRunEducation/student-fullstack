interface Student {
  id: number,
  name: string,
  password: string,
  //exams: Exam[]
}

type Exam = {
  name: string;
  mark: number;
}