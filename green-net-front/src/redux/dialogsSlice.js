import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createPostDialog: false,
    createEventDialog: false,
    showAddMarkerDialog: false,
    createShopCardDialog: false
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

        changeShowAddMarkerDialog: (state) => {
            state.showAddMarkerDialog = !state.showAddMarkerDialog;
        },

        changeShopCardDialogAction: (state) => {
            state.createShopCardDialog = !state.createShopCardDialog;
        }
    }
})

export const { changeEventDialogAction, changePostDialogAction, changeShowAddMarkerDialog, changeShopCardDialogAction } = dialogsSlice.actions
export default dialogsSlice.reducer