import {NavLink, useParams} from "react-router-dom";
import {useGetStudentByIdQuery} from "../store/api/studentApi.ts";
import RequestError from "./RequestError.tsx";
import {useAppDispatch} from "../store/hooks.ts";
import {selectStudent} from "../store/slices/studentSlice.ts";


const StudentCard = () => {
  const {id} = useParams<{ id: string }>()

  // todo: id! must be handled properly
  const {data: student, error} = useGetStudentByIdQuery(id!)
  const dispatch = useAppDispatch()

  const selectStudentHandler = () =>
    dispatch(selectStudent(student))

  if (error) return <RequestError error={error}></RequestError>
  return (
    <>
      <div>{student?.name} {student?.id}</div>
      <NavLink to={`/students/edit/${student?.id}`} onClick={selectStudentHandler}>
        Edit Student
      </NavLink>
    </>
  );
}

export default StudentCard;