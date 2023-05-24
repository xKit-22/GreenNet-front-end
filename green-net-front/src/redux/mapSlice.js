import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    coordinates: [],
    selectedCoordinates: []
}

export const getAllMarkers = createAsyncThunk(
    'map/getAllMarkers',
    async (_, {rejectWithValue, dispatch}) => {
      try {
        const res = await axios.get(`http://localhost:3000/marker`);
        dispatch(getAllMarkersAction(res.data));
      } catch (error) {
        alert(error.response.data.message)
      }
    }
  )

export const createMarker = createAsyncThunk(
    'map/createMarker',
    async (data, {rejectWithValue, dispatch}) => {
      try {
        const res = await axios.post('http://localhost:3000/marker', data);
        dispatch(createMarkerAction(res.data));
      } catch (error) {
        alert(error.response.data.message)
      }
      
    }
);

export const mapSlice = createSlice({
    name: 'map',
    initialState: initialState,
    reducers: {
        getAllMarkersAction: (state, action) => {
            state.coordinates = action.payload;
        },

        setSelectedCoordinatesAction: (state, action) => {
            state.selectedCoordinates = action.payload;
        },

        createMarkerAction: (state, action) => {
            state.coordinates.push(action.payload);        
          },
    }
})

export const { getAllMarkersAction, setSelectedCoordinatesAction, createMarkerAction } = mapSlice.actions
export default mapSlice.reducer