import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    createPostDialog: false,
    createEventDialog: false,
    createShopCardDialog: false,
    showAddMarkerDialog: false,
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

        changeMarkerInfoDialogAction: (state) => {
            state.showMarkerInfoDialog = !state.showMarkerInfoDialog;
        },

        changeShowAddMarkerDialog: (state) => {
            state.showAddMarkerDialog = !state.showAddMarkerDialog;
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
    changeMarkerInfoDialogAction,
    changeServerErrorAction,
    changeShopCardDialogAction } = dialogsSlice.actions
export default dialogsSlice.reducer