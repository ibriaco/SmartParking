import { ACTION_UPDATE_AREAS, ACTION_UPDATE_FILTERS } from '../constants/redux_constants';

export function updateAreas(areas) {
    return {
        type: ACTION_UPDATE_AREAS,
        payload: areas
    }
}

