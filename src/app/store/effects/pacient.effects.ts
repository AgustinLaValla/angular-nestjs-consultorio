import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PacientsService } from 'src/app/services/pacients.service';
import {
    loadGetSinglePacient, loadGetSinglePacientSuccess, loadGetSinglePacientFailed, loadUpdateSinglePacientInfo,
    loadUpdateSinglePacientInfoFailed, loadGetPacientByDNI, loadGetPacientByDNISuccess, loadGetPacientByDNIFailed,  loadUpdatePacientSuccess, loadUpdateSinglePacientInfoSuccess, closePacientDataDialog
} from '../actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { of } from 'rxjs';

@Injectable()
export class PacientEffects {
    constructor(private action$: Actions, private pacientsService: PacientsService) { }

    //loadGetSinglePacient Effect
    loadGetSinglePacient$ = createEffect(() => this.action$.pipe(
        ofType(loadGetSinglePacient),
        switchMap(({ pacientId }) => this.pacientsService.getSinglePacient(pacientId).pipe(
            map((pacient: Pacient) => loadGetSinglePacientSuccess({ pacient: pacient })),
            catchError((error: any) => of(loadGetSinglePacientFailed({ error })))
        ))
    ));

    //loadUpdateSinglePacient Effect
    loadUpdateSinglePacient$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateSinglePacientInfo),
        switchMap(({ newPacientData }) => this.pacientsService.updatePacient(newPacientData).pipe(
            switchMap((paciente) => [
                loadUpdatePacientSuccess({ paciente }),
                loadUpdateSinglePacientInfoSuccess({ newPacientData: paciente }),
                closePacientDataDialog({close:true})
            ]),
            catchError((error: any) => {
                closePacientDataDialog({close:false});
                return of(loadUpdateSinglePacientInfoFailed({ error }))
        })
        ))
    ));

    loadGetPacientByDni$ = createEffect(() => this.action$.pipe(
        ofType(loadGetPacientByDNI),
        switchMap(({ dni }) => this.pacientsService.getPacientByDNI(dni).pipe(
            map((pacient: Pacient) => loadGetPacientByDNISuccess({ pacient: pacient })),
            catchError((error) => of(loadGetPacientByDNIFailed({ error })))
        ))
    ));

};