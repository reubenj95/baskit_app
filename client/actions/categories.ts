// import type { ThunkAction } from 'redux-thunk'
// import Category

// //todo - import API funcs once created

// export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
// export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
// export const FAILURE_CATEGORIES = 'FAILURE_CATEGORIES'

// export type CategoryAction =
//   | { type: typeof REQUEST_CATEGORIES }
//   | { type: typeof RECEIVE_CATEGORIES; payload: Category }
//   | { type: typeof FAILURE_CATEGORIES; payload: string }

// export function requestCategories(): CategoryAction {
//   return {
//     type: REQUEST_CATEGORIES,
//   }
// }

// export function receiveCategories(categories: Category[]): CategoryAction {
//   return {
//     type: RECEIVE_CATEGORIES,
//     payload: categories,
//   }
// }

// export function failureCategories(errorMessage: string): CategoryAction {
//   return {
//     type: FAILURE_CATEGORIES,
//     payload: errorMessage,
//   }
// }

// // export function fetchCategories(): ThunkAction {
// //   return (dispatch) => {
// //     dispatch(requestCategories())
// //     return getCategories()
// //       .then((categories) => {
// //         dispatch(receiveCategories(categories))
// //       })
// //       .catch((err) => {
// //         if (err instanceof Error) {
// //           dispatch(failureCategories(err.message))
// //         } else {
// //           dispatch(failureCategories('An unknown error occurred'))
// //         }
// //       })
// //   }
// // }
