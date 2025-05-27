interface Student {
  _id: number,
  name: string,
  password: string,
  scores: Record<string, number>
}

type Scores = {
  exam: string,
  score: number
}