import { configureStore } from "@reduxjs/toolkit"
import coordinatesReducer from "./reducers/coordinatesReducer"
import infoSettingsReducer from "./reducers/infoSettingsReducer"
import isMapReducer from "./reducers/isMapReducer"
import userReducer from "./reducers/userReducer"

export const store = configureStore({
    reducer: {
        coordinates: coordinatesReducer,
        isMap: isMapReducer,
        infoSettings: infoSettingsReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch