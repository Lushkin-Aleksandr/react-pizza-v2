import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    // Here will be initial state
    categoryId: 0,
    sort: {
        name: 'популярности (desc)',
        sortProperty: 'rating'
    },
    currentPage: 1,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
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

export const selectFilter = state => state.filter;
export const selectFilterSort = state => state.filter.sort;


export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions; // Here we need to put reducers functions after we'll create them

export default filterSlice.reducer;