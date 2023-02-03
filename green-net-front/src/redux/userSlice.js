import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: "",
    user: {}
};

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      dispatch(getUserByIdAction(res.data));
    } catch (error) {
      alert(error.response.data.message)
    }
  }
)

export const registration = createAsyncThunk(
    'user/registration',
    async (data, {rejectWithValue, dispatch}) => {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/register', data);
        dispatch(registerAction(""));
        window.location.pathname = '/login'
      } catch (error) {
        alert(error.response.data.message)
      }
      
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (data, {rejectWithValue, dispatch}) => {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/login', data);
        const token = res.data.token;
        localStorage.setItem('currentUserId', jwtDecode(token).id);
        localStorage.setItem('token', token);
        dispatch(loginAction(res.data.token));
        window.location.pathname = '/profile'
      } catch (error) {
        alert(error.response.data.message)
      }
      
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getUserByIdAction: (state, action) => {
          state.user = action.payload;
        },

        registerAction: (state, action) => {
            state.token = action.payload;        
        },

        loginAction: (state, action) => {
            state.token = action.payload;        
        },
    },

    [login.fulfilled]: () => console.log('login fullfield'),
    [login.pending]: () => console.log('login pending'),
    [login.rejected]: () => console.log('login rejected'),

    [getUserById.fulfilled]: () => console.log('getUserById fullfield'),
    [getUserById.pending]: () => console.log('getUserById pending'),
    [getUserById.rejected]: () => console.log('getUserById rejected'),
})

export const { registerAction, loginAction, getUserByIdAction } = userSlice.actions
export default userSlice.reducer