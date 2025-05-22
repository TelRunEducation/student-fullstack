import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch} from "../store/hooks.ts";
import {clearSelectedStudent} from "../store/slices/studentSlice.ts";

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const backToAllStudentsHandler = () => dispatch(clearSelectedStudent())
  return (
    <>
      <NavLink to = {'/'} onClick={backToAllStudentsHandler}> Back to all students</NavLink>
      <br/>
      <Outlet/>
    </>
  );
};

export default MainLayout;