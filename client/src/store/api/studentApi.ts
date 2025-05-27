import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:8080';

const baseQuery = fetchBaseQuery({ baseUrl })
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 })

// Define a service using a base URL and expected endpoints
export const studentsApi = createApi({
  reducerPath: 'student',
  baseQuery: baseQueryWithRetry,
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
    updateStudentById: builder.mutation<Partial<Student>, Partial<Student>>({
      query: (newData) => ({
        url: `/student/${newData._id}`,
        method: 'PATCH',
        body: newData
      }),
      invalidatesTags: ['student', 'allStudents'],
    }),
    addStudent: builder.mutation<Partial<Student>, Partial<Student>>({
      query: (newData) => ({
        url: `/student`,
        method: 'POST',
        body: newData
      }),
      invalidatesTags: ['allStudents'],
    }),
    deleteStudent: builder.mutation<Partial<Student>, string>({
      query: (id) => ({
        url: `/student/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['allStudents'],
    }),
    findStudentsByName: builder.query<Student[], string>({
      query: (name) => ({
        url: `/student/name/${name}`,
      }),
    }),
    addScore: builder.mutation<void, {id: number, data: Scores}>({
      query: ( params: {id: number, data: Scores}  ) => ({
        url: `/score/student/${params.id}`,
        method: 'PATCH',
        body: params.data
      }),
      invalidatesTags: ['student'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentByIdMutation,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useLazyFindStudentsByNameQuery,
  useAddScoreMutation
} = studentsApi