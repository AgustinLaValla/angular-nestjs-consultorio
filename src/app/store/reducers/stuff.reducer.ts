import { Miembro } from 'src/app/interfaces/miembro.interface';
import * as fromSTUFF from '../actions/stuff.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface StuffState {
    stuff: Miembro[],
    error: any
};

const initialState: StuffState = {
    stuff: [],
    error: null
};

const reducer = createReducer(
    initialState,
    //Get Stuff
    on(fromSTUFF.loadGetStuffSuccess, (state, action) => {
        return {
            ...state,
            stuff: [...action.stuff]
        }
    }),
    on(fromSTUFF.loadGetStuffFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Add Miembro
    on(fromSTUFF.loadAddMiembroSuccess, (state, action) => {
        return {
            ...state,
            stuff: [...state.stuff, { ...action.miembro }]
        }
    }),
    on(fromSTUFF.loadAddMiembroFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Update Miembro
    on(fromSTUFF.loadUpdateMiembroSuccess, (state, action) => {
        const stuff = state.stuff.map((miembro) => miembro._id == action.miembro._id ? {...action.miembro} : miembro);
        return {
            ...state,
            stuff: stuff
        };
    }),
    on(fromSTUFF.loadUpdateMiembroFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Delete Miembro
    on(fromSTUFF.loadDeleteMiembroSuccess, (state, action) => {
        return {
            ...state,
            stuff: [...state.stuff.filter((miembro: Miembro) => miembro._id != action.id)]
        }
    }),
    on(fromSTUFF.loadDeleteMiembroFailed, (state, action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    })

);


export function stuffReducer(state: StuffState | undefined, action: Action): StuffState {
    return reducer(state, action);
};

export const getStuffSelector = (state: StuffState) => state.stuff;
export const getStuffErrorSelector = (state: StuffState) => state.error;