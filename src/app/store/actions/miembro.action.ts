import { createAction, props } from '@ngrx/store';
import { Miembro } from 'src/app/interfaces/miembro.interface';


//GET MIEMBRO ACTIONS
export const loadGetMiembro = createAction(
    '[MIEMBRO] Load Get Miembro',
    props<{id: string}>()
);
export const loadGetMiembroSuccess = createAction(
    '[MIEMBRO] Load Get Miembro Success',
    props<{miembro: Miembro}>()
);
export const loadGetMiembroFailed = createAction(
    '[MIEMBRO] Load Get Miembro Failed',
    props<{error: any}>()
);

//RESET MIEMBRO ACTIONS
export const loadResetMiembro = createAction(
    '[MIEMBRO] Load Reset Miembro',
);
