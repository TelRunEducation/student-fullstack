import {useDeleteStudentMutation, useGetAllStudentsQuery} from "../store/api/studentApi.ts";
import {useNavigate} from "react-router-dom";
import RequestError from "./RequestError.tsx";
import styles from './Studnets.module.css';
import * as React from "react";

const Students = () => {
  // const {data, error, isLoading} = useGetAllStudentsQuery()
  const {data: students, error} = useGetAllStudentsQuery()

  // const [deleteStudent, { isLoading, isSuccess, isError }] = useDeleteStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()
  const navigate = useNavigate()

  const handleViewStudentClick = (id: number) => {
    navigate(`/students/${id}`)
  }
  const handleAddNewStudentClick = () => {
    navigate(`/students/edit/${null}`)
  }

  const handleDeleteStudent =
    (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      deleteStudent(id.toString())
    }

  if (error) return <RequestError error={error}/>

  return (
    <>
      <h2 className={styles.header}>List of Students</h2>
        {students?.map(student => (
          <div
            key={student.id}
            className={styles.listItem}
            onClick={() => handleViewStudentClick(student.id)}>
            <span> {student.name} </span>
              <button
                className={styles.deleteBtn}
                onClick={(event) => handleDeleteStudent(student.id, event)}
              >
                Delete
              </button>
          </div>
        ))}
      <button className={styles.addStudent} onClick={handleAddNewStudentClick}>Add new student</button>
    </>
  );
}

export default Students;