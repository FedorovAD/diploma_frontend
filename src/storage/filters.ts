import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './context';

export type FilterType = {
    address: string,
    distance: number,
    price: number,
    type: number
}

export type PlaceType = 'Музей'|'Кинотеатр'|'Театр'


export type PlaceData = {
    name: string,
    place_type: PlaceType,
    link: string,
    price: string
}

export type PlacesState = {
    success: boolean;
    isError: boolean;
    errorMessage: string;
    data: PlaceData[];
    filters: FilterType | null;
}


export const getSuitablePlaces = createAsyncThunk<PlaceData[], void, { rejectValue: string }>(
    'filters/getSuitablePlaces',
    async (_, thunkAPI) => {
        const {filters} = (thunkAPI.getState() as RootState).params;
        if (!filters){
            return thunkAPI.rejectWithValue('User doesnt enter anything')
        }
        try {
            const response = await axios
            .request({
                method: "post",
                url: `http://localhost:8080/v1/result`,
                data: filters,
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

const initialState: PlacesState = { success: false, isError: false, errorMessage: '', data: [], filters: null}


const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction <FilterType>){
            state.filters = action.payload;
            return state;
        }
    },
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
export const {setFilters} = filterSlice.actions;
export default filterSlice;