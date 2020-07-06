import { createReducer, Action, on } from '@ngrx/store';
import * as fromPACIENT_DATA from '../actions/pacient-data.actions';

export interface PacientDataState {
    show: boolean;
    pacientId: string;
    closePacientDataDialog: boolean;
};

const initialState: PacientDataState = {
    show: false,
    pacientId: null,
    closePacientDataDialog: false
};

const reducer = createReducer(
    initialState,
    on(fromPACIENT_DATA.showPacientData, (state, action) => {
        return {
            ...state,
            show: true,
            pacientId: action.pacientId
        };
    }),
    on(fromPACIENT_DATA.hidePacientData, (state) => {
        return {
            ...state,
            show: false,
            pacientId: null
        };
    }),

    on(fromPACIENT_DATA.closePacientDataDialog, (state,action) => {
        return {
            ...state,
            closePacientDataDialog: action.close
        }
    }),
);

export function pacientDataReducer(state: PacientDataState | undefined, action: Action): PacientDataState {
    return reducer(state, action);
}

export const pacientDataSelector = (state: PacientDataState) => state.show;
export const pacientDataIdSelector = (state: PacientDataState) => state.pacientId;