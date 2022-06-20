import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    // Here will be initial state
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        // Here will be reducers functions
    },
})


export const { } = filterSlice.actions; // Here we need to put reducers functions after we'll create them

export default filterSlice.reducer;