import { configureStore } from "@reduxjs/toolkit";
// import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";
import { apiSlice } from "../api/apiSlice";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     applyMiddleware(ReduxThunk, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// const store = configureStore({
//   reducer: { heroes, filters },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(stringMiddleware),
//   devTools: process.env.NODE_ENV !== "production",
// });

const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer }, // deleted heroes
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
