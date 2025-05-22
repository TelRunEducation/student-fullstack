import {Student as Student} from "../model/student.js";
const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const deleteStudent = (id) => {
    const studentToDelete = students.get(id)
    students.delete(id)
    return studentToDelete;
}

export const findStudent = (id) => students.get(id)

export const getAllStudents = () => students.values().toArray()

export const getStudentsByName = (name) =>
  students.values()
    .toArray()
    .filter(student => student.name === name)