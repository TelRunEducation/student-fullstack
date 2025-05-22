import {configureStore} from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from '@reduxjs/toolkit/query'
import {studentsApi} from './api/studentApi.ts'
import studentReducer from "./slices/studentSlice.ts";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [studentsApi.reducerPath]: studentsApi.reducer,
    selectedStudent: studentReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentsApi.middleware),
})


// todo: clear out if I need this???
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']