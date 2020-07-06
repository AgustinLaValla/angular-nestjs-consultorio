import { createAction, props } from '@ngrx/store';
import { Miembro } from 'src/app/interfaces/miembro.interface';

//GET STUFF ACTIONS
export const loadGetStuff = createAction(
    '[STUFF] Load Get Stuff',
);
export const loadGetStuffSuccess = createAction(
    '[STUFF] Load Get Stuff Success',
    props<{stuff:Miembro[]}>()
);
export const loadGetStuffFailed = createAction(
    '[STUFF] Load Get Stuff Failed',
    props<{error:any}>()
);


//ADD MIEMBRO ACTIONS
export const loadAddMiembro = createAction(
    '[STUFF] Load Add Miembro',
    props<{miembro:Miembro, image?:string | ArrayBuffer}>()
);
export const loadAddMiembroSuccess = createAction(
    '[STUFF] Load Add Miembro Success',
    props<{miembro:Miembro}>()
);
export const loadAddMiembroFailed = createAction(
    '[STUFF] Load Add Miembro Failed',
    props<{error:any}>()
);

//UPDATE MIEMBRO ACTIONS
export const loadUpdateMiembro = createAction(
    '[STUFF] Load Update Miembro',
    props<{miembro:Miembro, image?:string | ArrayBuffer}>()
);
export const loadUpdateMiembroSuccess = createAction(
    '[SUFF] Load Update Miembro Success',
    props<{miembro:Miembro}>()
);
export const loadUpdateMiembroFailed = createAction(
    '[STUFF] Load Update Miembro Failed',
    props<{error:any}>()
);

//DELETE MEMBER ACTIONS
export const loadDeleteMiembro = createAction(
    '[STUFF] Load Delete Miembro',
    props<{id: string}>()
);
export const loadDeleteMiembroSuccess = createAction(
    '[STUFF] Load Delete Miembro Success',
    props<{id: string}>()
);
export const loadDeleteMiembroFailed = createAction(
    '[STUFF] Load Delete Miembro Failed',
    props<{error:any}>()
);


