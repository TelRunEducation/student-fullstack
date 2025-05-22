import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Students from "./components/Students.tsx";
import StudentCard from "./components/StudentCard.tsx";
import MainLayout from "./components/MainLayout.tsx";
import EditStudent from "./components/EditStudent.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className={'App'}>
        <Routes>
          <Route element={<MainLayout/>} path="/">
            <Route index element={<Students/>}/>
            <Route path="students/:id" element={<StudentCard/>}/>
            <Route path="students/edit/:id" element={<EditStudent/>}/>
            {/*<Route path="courses" element={<Courses/>}/>*/}
            {/*<Route path="courses/:courseSlug" element={<SingleCourse/>}/>*/}
            {/*<Route path="*" element={<NotFound/>}/>*/}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
