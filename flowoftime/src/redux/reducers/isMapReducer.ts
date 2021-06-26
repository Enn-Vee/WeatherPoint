import { createSlice} from "@reduxjs/toolkit"
import type { RootState } from '../store'

const initialState: boolean = false;

export const isMapSlice = createSlice({
    name: 'isMap',
    initialState,
    reducers: {
        toggleIsMap: (state: boolean) => state = !state
    }
})

export const { toggleIsMap } = isMapSlice.actions

export const isMap = (state: RootState) => state.isMap

export default isMapSlice.reducer;