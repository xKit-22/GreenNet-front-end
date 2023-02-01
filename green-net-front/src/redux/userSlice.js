import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
// import jwtDecode from 'jwt-decode';

const initialState = {
    token: ""
};

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
        // localStorage.setItem('user', JSON.stringify(jwtDecode(token)));
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
})

export const { registerAction, loginAction } = userSlice.actions
export default userSlice.reducer