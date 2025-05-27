import {useAppSelector} from "../store/hooks.ts";
import {selectedStudent} from "../store/slices/studentSlice.ts";
import {type FormEvent, useState} from "react";
import {useAddStudentMutation, useUpdateStudentByIdMutation} from "../store/api/studentApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import styles from './EditStudent.module.css';
import AddScore from "./AddScore.tsx";

const EditStudent = () => {
  const {id} = useParams<{ id: string }>()

  const isNewStudent = id === 'null'

  const student = useAppSelector(selectedStudent)

  const [name, setName] = useState(student?.name)
  const [newId, setNewId] = useState(student?._id)
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  // todo think of isLoading, error, isSuccess
  //const [updateStudent, { isLoading, error, isSuccess }] = useUpdateUserByIdMutation()
  const [updateStudent] = useUpdateStudentByIdMutation()
  const [addStudent] = useAddStudentMutation()

  const handleEditStudent = (e: FormEvent) => {
    e.preventDefault()
    if (isNewStudent) {
      addStudent({_id: newId, name, password})
      navigate('/')
    } else {
      updateStudent({_id: student?._id, name, password})
      navigate(`/students/${student?._id}`)
    }
  }
  return (
    <>
      <form onSubmit={handleEditStudent}>
        <label>
          Student ID:
          <input
            className={styles.formField}
            type="number"
            value={newId}
            onChange={(e) => setNewId(+e.target.value)}
            readOnly={!isNewStudent}
            required
          />
        </label>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">{isNewStudent ? "Add" : "Update"}</button>
      </form>
      <br/>
      {!isNewStudent && <AddScore />}
    </>
  )
};

export default EditStudent;