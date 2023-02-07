import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createPostDialog: false,
    createEventDialog: false
}

export const dialogsSlice = createSlice({
    name: 'dialog',
    initialState: initialState,
    reducers: {
        changePostDialogAction: (state) => {
          state.createPostDialog = !state.createPostDialog;
        },

        changeEventDialogAction: (state) => {
            state.createEventDialog = !state.createEventDialog;
        },
    }
})

export const { changeEventDialogAction, changePostDialogAction } = dialogsSlice.actions
export default dialogsSlice.reducer