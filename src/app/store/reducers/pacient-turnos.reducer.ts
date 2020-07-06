import { Turno } from 'src/app/interfaces/turno.interface';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENTE_TURNOS from '../actions/pacient-turnos.actions';

export interface Pacient_Turnos { 
    pacient_turnos: Turno[];
    updatedFromPacientSection:boolean,
    error: any;
};

const initialState: Pacient_Turnos = {
    pacient_turnos: [],
    updatedFromPacientSection:false,
    error: null
};

const reducer = createReducer(
    initialState,
    //get Pacient Turnos
    on(fromPACIENTE_TURNOS.loadGetPacientTurnosSuccess, (state,action) => {
        return {
            ...state,
            pacient_turnos: [...action.pacient_turnos]
        }
    }),
    on(fromPACIENTE_TURNOS.loadGetPacientTurnosFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    on(fromPACIENTE_TURNOS.loadUpdatePacientTurnos, (state,action) => {
        console.log(action.turno);
        return {
            ...state,
            pacient_turnos: state.pacient_turnos.map(turno => turno._id === action.turno._id ? { ...action.turno } : turno)
        };
    }),
    on(fromPACIENTE_TURNOS.loadUpdatePacientTurnosFailed, (state,action) => {
        return {
            ...state,
            error: { ...action.error }
        }
    }),

    //Delete turno from pacient section 
    on(fromPACIENTE_TURNOS.loadDeleteTurnoFromPacientSectionSuccess, (state,action) => {
        return { 
            ...state,
            pacient_turnos: state.pacient_turnos.filter(turno => turno._id != action.turno._id)
        };
    }),
    on(fromPACIENTE_TURNOS.loadDeleteTurnoFromPacientSectionFailed, (state,action) => {
        return {
            ...state,
            error:{...action.error}
        };
    }),

    on(fromPACIENTE_TURNOS.turnoUpdatedFromPacientSection, (state,action) => {
        return {
            ...state,
            updatedFromPacientSection: action.updatedFromPacientSection
        }
    }),
    //Reset Pacient Turno Store
    on(fromPACIENTE_TURNOS.loadResetPacientTurnoStore, (state) => {
        return {
            ...state,
            pacient_turnos: null
        };
    })
);

export function pacientTurnosReducer(state:Pacient_Turnos = initialState, action: Action) {
    return reducer(state,action);
};

//PacientTurnos Selectors
export const pacientSelector = (state:Pacient_Turnos) => state.pacient_turnos;
export const pacientErrorSelector = (state:Pacient_Turnos) => state.error;
export const updatedFromPacientSec = (state:Pacient_Turnos) => state.updatedFromPacientSection;
