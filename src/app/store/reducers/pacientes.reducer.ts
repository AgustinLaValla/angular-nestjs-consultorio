import { Pacient } from 'src/app/interfaces/pacient.interface';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENTES from '../actions/pacientes.action';

export interface PacientesState { 
    pacientes: Pacient[];
    error: any,
    counter:number,
    reload:boolean
};

const initialState:PacientesState = {
    pacientes: [],
    error:null,
    counter: 0,
    reload:false
};

const reducer = createReducer(
    initialState,
    //Get Pacientes
    on(fromPACIENTES.loadGetPacientsSuccess, (state,action) => {
        return {
            ...state,
            pacientes: [...action.pacientes]
        }
    }),
    on(fromPACIENTES.loadGetPacientsFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Update Pacientes
    on(fromPACIENTES.loadUpdatePacientSuccess, (state,action)=> {
        console.log('pasé')
        return { 
            ...state,
            pacientes: state.pacientes.map(pacient => pacient._id === action.paciente._id ? { ...action.paciente } : pacient)
        }
    }),
    on(fromPACIENTES.loadUpdatePacientFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Delete Paciente
    on(fromPACIENTES.loadDeletePacient, (state,action) => {
        return {
            ...state,
            pacientes: state.pacientes.filter(paciente => paciente._id != action.paciente._id)
        }
    }),
    on(fromPACIENTES.loadDeletePacientFailed, (state,action) => {
        return {
            ...state,
            error: {...action.error}
        }
    }),

    //Get Pacientes By Last Name
    on(fromPACIENTES.loadGetPacientByLastnameSuccess, (state,action) => {
        return { 
            ...state, 
            pacientes: [...action.pacients]
        };
    }),
    on(fromPACIENTES.loadResetPacientList, (state) => {
        return {
            ...state,
            pacientes: null,
            error:null
        };
    }),
    on(fromPACIENTES.loadGetPacientsCounterSuccess, (state,action) => { 
        return {
            ...state,
            counter: action.pacientsCounter
        }
    }),

    on(fromPACIENTES.loadReoloadPacientList, (state, action) => {
        return {
            ...state,
            reload: action.reload
        };
    })
);

export function pacientesReducer(state:PacientesState | undefined, action:Action): PacientesState{ 
    return reducer(state,action);
}

//Selectors
export const pacientesSelector = (state:PacientesState) => state.pacientes;
export const pacientesErrorSelector = (state:PacientesState) => state.error;
export const pacientesCounterSelector = (state:PacientesState) => state.counter;
export const pacientListReloadProperty = (state: PacientesState) => state.reload;