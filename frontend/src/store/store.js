import { configureStore, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../utils/axiosInstance';

const herosSlice = createSlice({
    name: 'heros',
    initialState: {
        heros: [],
        herosPerPage: 5,
        currentPage: 1,
    },
    reducers: {
        fetchHeros: (state, action) => {
            state.heros = [...action.payload];
        },
        onNavigateNext: (state) => {
            state.currentPage++;
        },
        onNavigatePrev: (state) => {
            state.currentPage--;
        },
        onClickCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

const store = configureStore(
    {
        reducer: {
            heroStore: herosSlice.reducer
        }
    }
);

const fetchAllHeros = () => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.get("/allHeros");

            if (response.data.heros) {
                dispatch(herosSlice.actions.fetchHeros(response.data.heros))
            }
        } catch (error) {
            console.error("An unexpected error ocurred", error.message);
        }
    }
}

export default store;
export const HerosAction = herosSlice.actions;
export { fetchAllHeros };