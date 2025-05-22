import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:8080';

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
  reducerPath: 'student',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['student', 'allStudents'],
  endpoints: (builder) => ({
    getAllStudents: builder.query<Student[], void>({
      query: () => '/student',
      providesTags: ['allStudents'],
    }),
    getStudentById: builder.query<Student, string>({
      query: (id) => `/student/${id}`,
      providesTags: ['student'],
    }),
    updateStudentById: builder.mutation<any, Partial<Student>>({
      query: (newData) => ({
        url: `/student/${newData.id}`,
        method: 'PATCH',
        body: newData
      }),
      invalidatesTags: ['student', 'allStudents'],
    }),
    addStudent: builder.mutation<any, Partial<Student>>({
      query: (newData) => ({
        url: `/student`,
        method: 'POST',
        body: newData
      }),
      invalidatesTags: ['allStudents'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentByIdMutation,
  useAddStudentMutation,
} = studentsApi