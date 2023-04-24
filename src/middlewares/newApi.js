// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { REHYDRATE } from 'redux-persist'

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL }),
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === REHYDRATE) {
//       return action.payload[reducerPath]
//     }
//   },
//   endpoints: (builder) => ({
//     fetchOMs: builder.query({
//       query: (user) => `/api/om/${user}`,
//     }),
//     // Add an endpoint for fetching a single OM
//     getOmMission: builder.query({
//       query: (id) => `/api/om/mission/find/${id}`,
//     }),
//   }),
// })


// export const { fetchOMs, getOmMission } = api;
