import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../utils/api"

const initialState = {
  token: localStorage.getItem("token") ?? null, // ✅ récupération du token si déjà connecté
  mail: localStorage.getItem("email") ?? null,
  firstName: "",
  lastName: "",
  id: "",
  authenticationStatus: "",
  errorMsg: "",
  isLoading: false,
}


// Login User
export const login = createAsyncThunk(
  "login",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_USER_LOGIN_ENDPOINT,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      if (rememberMe) {
        // localStorage.setItem("token", response.data.body.token)
        localStorage.setItem("email", email)
      } else {
        localStorage.removeItem("email")
      }

      const token = response?.data?.body?.token

      return { token, email }
    } catch (err) {
      if (!err?.response) {
        return thunkAPI.rejectWithValue("No Server Response")
      }

      // console.log(err.response.data)
      // console.log(err.response.data.message)
      // console.log(err.response.status)
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// Load Profile
export const loadProfile = createAsyncThunk(
  "loadProfile",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_USER_PROFILE_ENDPOINT,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const firstName = response?.data?.body?.firstName
      const lastName = response?.data?.body?.lastName
      const email = response?.data?.body?.email
      const id = response?.data?.body?.id

      return { firstName, lastName, email, id }
    } catch (err) {
      if (!err?.response) {
        return thunkAPI.rejectWithValue("No Server Response")
      }

      // console.log(err.response.data)
      // console.log(err.response.data.message)
      // console.log(err.response.status)
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

// Update Profile
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ firstname, lastname, token }, thunkAPI) => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_USER_PROFILE_ENDPOINT,
        {
          firstName: firstname,
          lastName: lastname,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const email = response?.data?.body?.email
      const id = response?.data?.body?.id
      const firstName = response?.data?.body?.firstName
      const lastName = response?.data?.body?.lastName

      // console.log(response.data)

      return { firstName, lastName, email, id }
    } catch (err) {
      if (!err?.response) {
        return thunkAPI.rejectWithValue("No Server Response")
      }

      thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrorMsg: (state, action) => {
      state.errorMsg = ""
    },
    signOut: (state, action) => {
      state.token = null
      state.mail = localStorage.getItem("email") ?? null
      state.firstName = ""
      state.lastName = ""
      state.id = ""
      state.authenticationStatus = ""
      state.errorMsg = ""
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
  state.token = action.payload.token
  state.authenticationStatus = "success"
  state.isLoading = false
  state.mail = action.payload.email
  state.errorMsg = ""
  // ✅ Sauvegarde du token pour pouvoir le réutiliser
  localStorage.setItem("token", action.payload.token)
})

      .addCase(login.pending, (state, action) => {
        state.authenticationStatus = "pending"
        state.isLoading = true
        state.errorMsg = ""
      })
      .addCase(login.rejected, (state, action) => {
        state.authenticationStatus = "rejected"
        state.isLoading = false
        state.errorMsg = action.payload
      })

      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.errorMsg = ""
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.id = action.payload.id
        state.mail = action.payload.email
      })
      .addCase(loadProfile.pending, (state, action) => {
        state.isLoading = true
        state.errorMsg = ""
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.errorMsg = ""
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true
        state.errorMsg = ""
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload
      })
  },
})

export const { clearErrorMsg, signOut } = actions
export default reducer

// Selector used with the hook useSelector
export const userSelector = (state) => state.user
