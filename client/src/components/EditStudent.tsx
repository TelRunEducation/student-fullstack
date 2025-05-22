import {useAppSelector} from "../store/hooks.ts";
import {selectedStudent} from "../store/slices/studentSlice.ts";
import {type FormEvent, useState} from "react";
import {useAddStudentMutation, useUpdateStudentByIdMutation} from "../store/api/studentApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import styles from './EditStudent.module.css';

const EditStudent = () => {
  const {id} = useParams<{ id: string }>()

  const isNewStudent = id === 'null'

  const student = useAppSelector(selectedStudent)

  const [name, setName] = useState(student?.name)
  const [newId, setNewId] = useState(student?.id)
  const [password, setPassword] = useState(student?.password)

  const navigate = useNavigate();

  // todo think of isLoading, error, isSuccess
  //const [updateStudent, { isLoading, error, isSuccess }] = useUpdateUserByIdMutation()
  const [updateStudent] = useUpdateStudentByIdMutation()
  const [addStudent] = useAddStudentMutation()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isNewStudent) {
      addStudent({id: newId, name, password})
      navigate('/')
    } else {
      updateStudent({id: student?.id, name})
      navigate(`/students/${student?.id}`)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
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
        {isNewStudent && <div>
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
        }
        <button type="submit">{isNewStudent ? "Add" : "Update"}</button>
      </form>
    </>
  )
};

export default EditStudent;