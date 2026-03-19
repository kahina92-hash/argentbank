import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/auth"

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
