import {useGetAllStudentsQuery} from "../store/api/studentApi.ts";
import {useNavigate} from "react-router-dom";
import RequestError from "./RequestError.tsx";
import styles from './Studnets.module.css';

const Students = () => {
  // const {data, error, isLoading} = useGetAllStudentsQuery()
  const {data, error} = useGetAllStudentsQuery()
  const navigate = useNavigate()
  const handleViewStudentClick = (id: number) => {
    navigate(`/students/${id}`)
  }
  const handleAddNewStudentClick = () => {
    navigate(`/students/edit/${null}`)
  }

  if (!!error) return <RequestError error={error}/>


  return (
    <>
      <h2 className={styles.header}>List of Students</h2>
      {data?.map(student =>
        <div className={styles.listItem} onClick={() => handleViewStudentClick(student.id)} key={student.id}>
          {student.name}
        </div>
      )}
      <button onClick={handleAddNewStudentClick}>Add new student</button>
    </>
  );
}

export default Students;