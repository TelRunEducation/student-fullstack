import * as repo from '../repository/studentRepository.js'

export const getStudents = async (req, res) =>
  res.json(await repo.getAllStudents())

export const addStudent = async (req, res) => {
  const success = await repo.addStudent(req.body);
  if (success) {
    res.status(204).send();
  } else {
    res.status(409).json(success);
  }
}

export const findStudent = async (req, res) => {
  const student = await repo.findStudent(+req.params.id);
  if (student) {
    delete student.password;
    res.json(student);
  } else {
    res.status(404).send();
  }
}

export const updateStudent = async (req, res) => {
  const student = repo.updateStudent(+req.params.id, req.body);
  if (student) {
    delete student.scores;
    res.json(student)
  } else {
    res.status(404).send();
  }
}

export const deleteStudent = async (req, res) => {
  const deletedStudent = await repo.deleteStudent(+req.params.id);
  deletedStudent
    ? res.json(deletedStudent)
    : res.status(404).type('text/plain').send();
}

export const addScore = async (req, res) => {
  await repo.addScore(+req.params.id, req.body)
    ? res.status(204).send()
    : res.status(404).type('text/plain').send();
}

export const findByName = async (req, res) =>
  res.json(await repo.getStudentsByName(req.params.name))

// export const countByName = (req, res) => {
//   //TODO
// }
//
// export const findByMinScore = (req, res) => {
//   //TODO
// }
//
