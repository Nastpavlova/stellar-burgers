import { createSlice } from '@reduxjs/toolkit'

const initialState = {

}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //тут будут async thunk
    }
})

export default feedSlice.reducer;