import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import type { RootState } from '../store'

interface InfoSettings {
    timezone: string,
    unit: string,
    locale: string,
    language: string
}

const initialState: InfoSettings = {
    timezone: 'America/New_York',
    unit: 'metric',
    locale: 'en-US',
    language: 'en'
};

export const InfoSettingsSlice = createSlice({
    name: 'InfoSettings',
    initialState,
    reducers: {
        setTimezone: (state: InfoSettings, action: PayloadAction<string>) => {
            state.timezone = action.payload
        },
        setUnit: (state: InfoSettings, action: PayloadAction<string>) => {
            state.unit = action.payload
        },
        setLocale: (state: InfoSettings, action: PayloadAction<string>) => {
            state.locale = action.payload
        },
        setLanguage: (state: InfoSettings, action: PayloadAction<string>) => {
            state.language = action.payload
        }
    }
})

export const { setTimezone, setUnit, setLocale, setLanguage } = InfoSettingsSlice.actions

export const selectTimezone = (state: RootState) => state.infoSettings.timezone
export const selectUnit = (state: RootState) => state.infoSettings.unit
export const selectLocale = (state: RootState) => state.infoSettings.locale
export const selectLanguage = (state: RootState) => state.infoSettings.language

export default InfoSettingsSlice.reducer;