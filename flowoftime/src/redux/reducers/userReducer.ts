import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from '../store'
import User, { Bookmark } from '../../interfaces/User'
import axios from 'axios'

export const getUser = createAsyncThunk('user/getUser', async () => {
    return await axios.get(process.env.REACT_APP_BACKEND_URL+'/auth/user', {
        withCredentials:true   
    }).then((res) => {
        return res.data;
    })
})

export const logOut = createAsyncThunk('user/logOut', async () => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL+'/logout',{}, {
        withCredentials:true   
    }).then((res) => {
        return res.data;
    })
})

export const addBookmark = createAsyncThunk('user/addBookmark', async (bookmark: Bookmark) => {
    return await axios.post(process.env.REACT_APP_BACKEND_URL+'/bookmarks/', bookmark, {
        withCredentials:true
    }).then(res => {
        return res.data;
    })
})

export const getBookmarks = createAsyncThunk('user/getBookmarks', async () => {
    return await axios.get(process.env.REACT_APP_BACKEND_URL+'/bookmarks/', {
        withCredentials:true
    }).then(res => {
        return res.data;
    })
})

export const deleteBookmark = createAsyncThunk('user/deleteBookmark', async (bookmark: Bookmark) => {
    return await axios.delete(process.env.REACT_APP_BACKEND_URL+'/bookmarks/', {
            data: bookmark, 
            withCredentials: true})
        .then(res => {
        return res.data;
    })
})

const initialState = null as User;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => state = action.payload)
        builder.addCase(logOut.fulfilled, (state) => state = null)
        builder.addCase(addBookmark.fulfilled, (state, action) => { 
            if(state)
                state.bookmarks = action.payload;
        })
        builder.addCase(getBookmarks.fulfilled, (state, action) => {
            if(state)
                state.bookmarks = action.payload
        })
        builder.addCase(deleteBookmark.fulfilled, (state, action) => {
            if(state)
                state.bookmarks = action.payload
        })
    },
})

export const user = (state: RootState) => state.user
export default userSlice.reducer;