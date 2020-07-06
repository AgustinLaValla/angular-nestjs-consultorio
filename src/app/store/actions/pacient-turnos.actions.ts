import { createAction, props } from '@ngrx/store';
import { Turno } from 'src/app/interfaces/turno.interface';

//GET PACIENTS ACTIONS
export const loadGetPacientTurnos = createAction(
    '[PACIENT_TURNOS] Get Pacient Turnos',
    props<{pacientId:string}>()
);
export const loadGetPacientTurnosSuccess = createAction(
    '[PACIENT_TURNOS] Get Pacient Turnos Success',
    props<{pacient_turnos:Turno[]}>()
);
export const loadGetPacientTurnosFailed = createAction(
    '[PACIENT_TURNOS] Get Pacient Turnos Failed',
    props<{error:any}>()
);

//UPDATE PACIENT TURNOS
export const loadUpdatePacientTurnos = createAction(
    '[PACIENT_TURNOS] Load Update Pacient Turnos',
    props<{turno: Turno}>()
);

export const loadUpdatePacientTurnosFailed = createAction(
    '[PACIENT_TURNOS] Load Update Pacient Turnos Failed',
    props<{error:any}>()
);

//LOAD DELETE TURNO FROM PACIENT SECTION ACTIONS
export const loadDeleteTurnoFromPacientSection = createAction(
    '[PACIENT_TURNOS] Load Delete Turno From Pacient Section',
    props<{especialistaId:string, turno:Turno}>()
);
export const loadDeleteTurnoFromPacientSectionSuccess = createAction(
    '[PACIENT_TURNOS] Load Delete Turno From Pacient Section Success',
    props<{turno:Turno}>()
);
export const loadDeleteTurnoFromPacientSectionFailed = createAction(
    '[PACIENT_TURNOS] Load Delete Turno From Pacient Section Failed',
    props<{error:any}>()
);

export const turnoUpdatedFromPacientSection = createAction(
    '[PACIENT_TURNOS] Turno Updated From Pacient Section',
    props<{updatedFromPacientSection:boolean}>()
)

//LOAD RESET PACIENT TURNO ACTIONS
export const loadResetPacientTurnoStore = createAction(
    '[PACIENT_TURNOS] Load Reset Pacient Turno Store'
);