import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useLazyFindStudentsByNameQuery,
} from "../store/api/studentApi.ts";
import {useNavigate} from "react-router-dom";
import RequestError from "./RequestError.tsx";
import styles from './Studnets.module.css';
import * as React from "react";
import {useRef, useState} from "react";

const Students = () => {
  // const {data, error, isLoading} = useGetAllStudentsQuery()
  const isSearchMode = useRef(false)
  const {data: students, error, refetch} = useGetAllStudentsQuery()
  const [trigger, { data: filteredStudents }] = useLazyFindStudentsByNameQuery()

  // const [deleteStudent, { isLoading, isSuccess, isError }] = useDeleteStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState('')

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
      refetch()
    }

  const handleFilterByName = () => {
    if (searchName.trim().length < 1) return
    isSearchMode.current = true
    trigger(searchName)
  }

  const handleResetSearchByName = () => {
    setSearchName('')
    isSearchMode.current = false
    refetch()
  }
  if (error) return <RequestError error={error}/>
  const source = isSearchMode.current ? filteredStudents : students

  return (
    <>
      <div>
        Filter students
        <br/>
        <input
          type={'text'}
          placeholder={'Filter by name...'}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleFilterByName}>Find by name</button>
        <button onClick={handleResetSearchByName}>Reset filter</button>
      </div>
      <h2 className={styles.header}>List of Students</h2>
      {
        source?.map(student => (
        <div
          key={student._id}
          className={styles.listItem}
          onClick={() => handleViewStudentClick(student._id)}>
          <span> {student.name} : {student._id} </span>
          <button
            className={styles.deleteBtn}
            onClick={(event) => handleDeleteStudent(student._id, event)}
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