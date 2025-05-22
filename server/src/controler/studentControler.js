import * as repo from '../repository/studentRepository.js'
import {getAllStudents, getStudentsByName} from "../repository/studentRepository.js";

export const getStudents = (req, res) =>
  res.json(repo.getAllStudents())

export const addStudent = (req, res) => {
  const success = repo.addStudent(req.body);
  if (success) {
    res.status(204).send();
  } else {
    res.status(409).json(success);
  }
}

export const findStudent = (req, res) => {
  const student = repo.findStudent(+req.params.id);
  if (student) {
    const tmp = {...student};
    delete tmp.password;
    res.json(tmp);
  } else {
    res.status(404).send();
  }
}

export const updateStudent = (req, res) => {
  const student = repo.findStudent(+req.params.id);
  if (student) {
    student.name = req.body.name;
    res.status(200).send();
  } else {
    res.status(404).send();
  }
}

export const deleteStudent = (req, res) => {
  const deletedStudent = repo.deleteStudent(+req.params.id);
  console.log(deletedStudent);
  deletedStudent
    ? res.json(deletedStudent)
    : res.status(404).type('text/plain').send();
}

export const addScore = (req, res) => {
  //TODO
}

export const findByName = (req, res) =>
  res.json(repo.getStudentsByName(req.params.name))

export const countByName = (req, res) => {
  //TODO
}

export const findByMinScore = (req, res) => {
  //TODO
}

