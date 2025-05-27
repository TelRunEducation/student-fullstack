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
      <div>{student?.name} {student?._id}</div>
      {student?.scores && Object.entries(student.scores).map(([key, value]) => (
        <div key={key}>
          Subject: <span style={{ fontWeight: 'bold' }}>{key}</span>,
          Score: <span style={{ fontWeight: 'bold' }}>{value}</span>
        </div>
      ))}
      <NavLink to={`/students/edit/${student?._id}`} onClick={selectStudentHandler}>
        Edit Student
      </NavLink>
    </>
  );
}

export default StudentCard;