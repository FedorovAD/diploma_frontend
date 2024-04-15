import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type FilterState = {
    address: string,
    distance: number,
    price: number
}



const initialState: FilterState = { address: '', distance: 0, price: 0 }


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<FilterState>) {
            state.address = action.payload.address
            state.distance = action.payload.distance
            state.price = action.payload.price
        },
    },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice;