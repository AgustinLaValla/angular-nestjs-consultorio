import { createAction, props } from '@ngrx/store';

export const showPacientData = createAction(
    '[PACIENT DATA] Show Pacient Data',
    props<{pacientId:string}>()
);
export const hidePacientData = createAction(
    '[PACIENT DATA] Hide Pacient Data'
);

export const closePacientDataDialog = createAction(
    '[PACIENT DATA] Show Pacient Data Dialog',
    props<{close:boolean}>()
);
