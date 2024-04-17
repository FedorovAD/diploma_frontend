import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './context';

export type FilterType = {
    address: string,
    distance: number,
    price: number
}

export type PlaceType = 'Музей'|'Кинотеатр'|'Театр'


export type PlaceData = {
    name: string,
    place_type: PlaceType,
    link: string,
}

export type PlacesState = {
    success: boolean;
    isError: boolean;
    errorMessage: string;
    data: PlaceData[]
}


export const getSuitablePlaces = createAsyncThunk<PlaceData[], FilterType, { rejectValue: string }>(
    'filters/getSuitablePlaces',
    async (filter, thunkAPI) => {
        try {
            const response = await axios
            .request({
                method: "post",
                url: `http://localhost:8080/v1/result`,
                data: filter,
                headers: {
                    'Access-Control-Allow-Origin': "http://localhost:3000",
                },
                withCredentials: true,
            });
            console.log(response.data)
            return response.data;
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue(err.message ?? 'unknown error');
        }
    },
)

const initialState: PlacesState = { success: false, isError: false, errorMessage: '', data: []}


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuitablePlaces.fulfilled, (state, action) => {
                state.success = true
                state.isError = false
                state.errorMessage = ''
                state.data = action.payload
            })
            .addCase(getSuitablePlaces.rejected, (state, action) => {
                state.isError = true
                state.success = false
                if (action.payload) { state.errorMessage = action.payload }
            })
    }
});

export default filterSlice;