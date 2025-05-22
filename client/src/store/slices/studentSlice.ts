import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../store.ts";

type SelectedStudent = {
  selectedStudent: Student | null;
}
const initialState: SelectedStudent = {
  selectedStudent:  null
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    selectStudent: (state, action) => {
      state.selectedStudent = action.payload
    },
    clearSelectedStudent: (_state) => {
      return initialState
    },
  }
})

export const {selectStudent, clearSelectedStudent} = studentSlice.actions;
export const selectedStudent = (state: RootState) => state.selectedStudent.selectedStudent
export default studentSlice.reducer