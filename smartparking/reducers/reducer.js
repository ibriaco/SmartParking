import { ACTION_UPDATE_AREAS, ACTION_UPDATE_FILTERS } from '../constants/redux_constants';

const initialState = {
    areas: {},
    filters: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
    case ACTION_UPDATE_AREAS:
        return {
        ...state,
        areas: action.payload
    };
    case ACTION_UPDATE_FILTERS:
        return {
        ...state,
        filters: action.payload
    };
    
    default:
        return state;
    }
}
export default reducer;