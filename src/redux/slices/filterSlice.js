import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    // Here will be initial state
    categoryId: 0,
    sort: {
        name: 'популярности (desc)',
        sortProperty: 'rating'
    },
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
        },
        
    },
})


export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions; // Here we need to put reducers functions after we'll create them

export default filterSlice.reducer;