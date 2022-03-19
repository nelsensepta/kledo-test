import { configureStore } from "@reduxjs/toolkit";

// import feuturedReducer from "./slices/feuturedSlice";
import userReducer from "./userSlice";

// const localStorageMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem("applicationState", JSON.stringify(getState()));
//     return result;
//   };
// };

// const reHydrateStore = () => {
//   if (localStorage.getItem("applicationState") !== null) {
//     return JSON.parse(localStorage.getItem("applicationState")); // re-hydrate the store
//   }
// };

const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("dashboard/")) {
    const authState = store.getState().user;
    localStorage.setItem("user", JSON.stringify(authState));
  }
  return result;
};
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [authMiddleware],
});

export default store;
