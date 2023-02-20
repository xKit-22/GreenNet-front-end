import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    usersPosts: [],
    code: 0
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

export const createPost = createAsyncThunk(
    'post/createPost',
    async (data, {rejectWithValue, dispatch}) => {
      try {
        const res = await axios.post('http://localhost:3000/posts/', data);
        dispatch(createPostAction(res.data));
      } catch (error) {
        alert(error.response.data.message)
      }
      
    }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const res = await axios.delete(`http://localhost:3000/posts/deletePost/${id}`);
      dispatch(deletePostAction(res.data));
    } catch (error) {
      alert(error.response.data.message)
    }
    
  }
);

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        getUsersPostsAction: (state, action) => {
          state.usersPosts = action.payload;
        },

        createPostAction: (state, action) => {
          state.usersPosts.push(action.payload);        
        },

        deletePostAction: (state, action) => {
          state.code = action.payload;        
        }
    },

    [getUsersPosts.fulfilled]: () => console.log('getUsersPosts fullfield'),
    [getUsersPosts.pending]: () => console.log('getUsersPosts pending'),
    [getUsersPosts.rejected]: () => console.log('getUsersPosts rejected'),
})

export const { getUsersPostsAction, createPostAction, deletePostAction } = postSlice.actions
export default postSlice.reducer