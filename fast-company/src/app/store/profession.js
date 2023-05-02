import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";


const professionsSlice=createSlice({
  name:"professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
},
reducers: {
  professionsRequested: (state) => {
  state.isLoading = true;
},
professionsReceived: (state, action) => {
  state.entities = action.payload;
  state.lastFetch = Date.now();
  state.isLoading = false;
},
professionsRequestFailed: (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
}
}
})
const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProffessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        console.log(lastFetch);
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            console.log("content",content)
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities) {
        const professionsArray = [];
        for (const profId of professionsIds) {
            for (const profession of state.professions.entities) {
                if (profession._id === profId) {
                  professionsArray.push(profession);
                    break;
                }
            }
        }
        console.log("professionsARR", professionsArray)
        return professionsArray;
    }
    return [];
};

export default professionsReducer;