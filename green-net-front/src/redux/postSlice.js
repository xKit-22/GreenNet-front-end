import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    usersPosts: []
};

export const getUsersPosts = createAsyncThunk(
  'post/getUsersPosts',
  async (userId, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/author/${userId}`);
      dispatch(getUsersPostsAction(res.data));
    } catch (error) {
      alert(error.response.data.message)
    }
  }
)

// export const registration = createAsyncThunk(
//     'user/registration',
//     async (data, {rejectWithValue, dispatch}) => {
//       try {
//         const res = await axios.post('http://localhost:3000/api/auth/register', data);
//         dispatch(registerAction(""));
//         window.location.pathname = '/login'
//       } catch (error) {
//         alert(error.response.data.message)
//       }
      
//     }
// );

// export const login = createAsyncThunk(
//     'user/login',
//     async (data, {rejectWithValue, dispatch}) => {
//       try {
//         const res = await axios.post('http://localhost:3000/api/auth/login', data);
//         const token = res.data.token;
//         const userId = jwtDecode(token).id;
//         localStorage.setItem('currentUserId', userId);
//         localStorage.setItem('token', token);
//         dispatch(loginAction(res.data.token));
//         window.location.pathname = `/${userId}`;
//       } catch (error) {
//         alert(error.response.data.message)
//       }
      
//     }
// );

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        getUsersPostsAction: (state, action) => {
          state.usersPosts = action.payload;
        },

        // registerAction: (state, action) => {
        //     state.token = action.payload;        
        // },

        // loginAction: (state, action) => {
        //     state.token = action.payload;        
        // },
    },

    [getUsersPosts.fulfilled]: () => console.log('getUsersPosts fullfield'),
    [getUsersPosts.pending]: () => console.log('getUsersPosts pending'),
    [getUsersPosts.rejected]: () => console.log('getUsersPosts rejected'),
})

export const { getUsersPostsAction } = postSlice.actions
export default postSlice.reducer