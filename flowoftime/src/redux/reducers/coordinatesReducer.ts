import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Coordinates from "../../interfaces/Coordinates"
import type { RootState } from '../store'

const initialState: Coordinates = {
    lat: 40.730610,
    lng: -73.935242
}

export const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        changeCoordinates: (state, action: PayloadAction<Coordinates>) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    }
})

export const { changeCoordinates } = coordinatesSlice.actions
export const selectLat = (state: RootState) => state.coordinates.lat
export const selectLng= (state: RootState) => state.coordinates.lng

export default coordinatesSlice.reducer;