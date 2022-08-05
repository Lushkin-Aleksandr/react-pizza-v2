import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { sort, order, category, search, page } = params;
    let responce = await axios.get(`https://62a23032cc8c0118ef5e8d7c.mockapi.io/items?sortBy=${sort}&order=${order}${category}${search}${page}`);
    
    return responce.data;
})

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },

    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        }
    }
})

export const selectPizzaData = state => state.pizza;


export const { setItems } = pizzaSlice.actions; // Here we need to put reducers functions after we'll create them

export default pizzaSlice.reducer;