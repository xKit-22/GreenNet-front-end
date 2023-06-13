import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createPostDialog: false,
    createEventDialog: false,
    createShopCardDialog: false
    showAddMarkerDialog: false,
    createShopCardDialog: false,
    showMarkerInfoDialog: false,
    showServerError: false
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
        changeShopCardDialogAction: (state) => {
            state.createShopCardDialog = !state.createShopCardDialog;
        },

        changeShopCardDialogAction: (state) => {
            state.createShopCardDialog = !state.createShopCardDialog;
        },

        changeMarkerInfoDialogAction: (state) => {
            state.showMarkerInfoDialog = !state.showMarkerInfoDialog;
        },

        changeServerErrorAction: (state) => {
            state.showServerError = !state.showServerError;
          },
    }
})

export const { 
    changeEventDialogAction,
    changePostDialogAction,
    changeShowAddMarkerDialog,
    changeShopCardDialogAction,
    changeMarkerInfoDialogAction,
    changeServerErrorAction,
    changeShopCardDialogAction} = dialogsSlice.actions
export default dialogsSlice.reducer