import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import {
    loadGetTurnosSuccess,
    loadGetTurnosFailed,
    loadGetTurnos, loadDeleteSingleTurno,
    loadGetTurnoByPacientLastname,
    loadGetTurnoByPacientLastnameSuccess,
    loadGetTurnoByPacientLastnameFailed,
    loadAddTurno,
    loadAddTurnoFailed,
    loadUpdateSingleTurno,
    loadGetTurnosPasados,
    loadGetTurnosPasadosSuccess,
    loadGetTurnosPasadosFailed,
    loadGetTurnosFromTo,
    loadGetTurnosFromToSuccess,
    loadGetTurnosFromToFailed,
    loadAddTurnoSuccess,
    loadUpdateSingleTurnoSuccess,
    loadUpdateSingleTurnoFailed,
    loadCloseDialog,
    loadDeleteSingleTurnoSuccess,
    loadDeleteSingleTurnoFailed,
    loadUpdatePacientTurnos,
    turnoUpdatedFromPacientSection,
    loadReoloadPacientList,
    loadGetPacientsCounter

} from '../actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { TurnosService } from 'src/app/services/turnos.service';
import { Turno } from 'src/app/interfaces/turno.interface';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnosEffect {
    constructor(private actions$: Actions, private turnosService: TurnosService) { }

    //GetTurnos Effect
    loadGetTurnos$ = createEffect(() => this.actions$.pipe(
        ofType(loadGetTurnos),
        switchMap(({ id, counter }) => this.turnosService.getMiembroTurnos(id, counter).pipe(
            map((turnos: Turno[]) => loadGetTurnosSuccess({ turnos: turnos })),
            catchError((error: any) => of(loadGetTurnosFailed({ error })))
        ))
    ));

    //AddTurno Effect 
    loadAddTurno$ = createEffect(() => this.actions$.pipe(
        ofType(loadAddTurno),
        switchMap(({ turno }) => this.turnosService.addTurno(turno).pipe(
            tap(console.log),
            switchMap((turnoCreated) => [
                loadAddTurnoSuccess({ turno: turnoCreated }),
                loadReoloadPacientList({ reload: true }),
                loadGetPacientsCounter()
            ]),
            catchError((error: any) => of(loadAddTurnoFailed({ error })))
        ))
    ));

    //UpdateSingleTurno Effect
    loadUpdateSingleTurno$ = createEffect(() => this.actions$.pipe(
        ofType(loadUpdateSingleTurno),
        switchMap(({ turno }) => this.turnosService.updateTurno(turno).pipe(

            switchMap(turnoUpdated => this.turnosService.turnoUpdatedFromPacientSection ?
                [
                    loadUpdateSingleTurnoSuccess({ turno: turnoUpdated }),
                    loadUpdatePacientTurnos({ turno: turnoUpdated }),
                    turnoUpdatedFromPacientSection({ updatedFromPacientSection: false }),
                    loadReoloadPacientList({ reload: true }),
                    loadGetPacientsCounter()
                ] :
                [
                    loadUpdateSingleTurnoSuccess({ turno: turnoUpdated }),
                    loadReoloadPacientList({reload:true}),
                    loadGetPacientsCounter()
                ]
            ),

            catchError((error) => {
                loadCloseDialog({ close: false });
                return of(loadUpdateSingleTurnoFailed({ error }))
            })
        ))
    ))

    //DeleteSingleTurnoEffect
    loadDeleteSingleTurno$ = createEffect(() => this.actions$.pipe(
        ofType(loadDeleteSingleTurno),
        switchMap(({ turno }) => this.turnosService.deleteSingleTurno(turno).pipe(
            map(turno => loadDeleteSingleTurnoSuccess({ turnoId: turno._id })),
            catchError(error => of(loadDeleteSingleTurnoFailed({ error })))
        ))
    ));

    //Get Turnos By Pacient Lastname
    loadGetTurnosByPacientLastName$ = createEffect(() => this.actions$.pipe(
        ofType(loadGetTurnoByPacientLastname),
        switchMap(({ especialistaId, value, tableType }) => {
            return this.turnosService.GetTurnoByPacientLastName(especialistaId, value, tableType).pipe(
                map((turnos: Turno[]) => loadGetTurnoByPacientLastnameSuccess({ turnos: turnos })),
                catchError((error: any) => of(loadGetTurnoByPacientLastnameFailed({ error })))
            )
        })
    ));

    //loadGetTurnosPasados Effect
    loadGetTurnosPasados$ = createEffect(() => this.actions$.pipe(
        ofType(loadGetTurnosPasados),
        switchMap(({ especialistaId, counter }) => this.turnosService.getOldTurnos(especialistaId, counter).pipe(
            map((turnos: Turno[]) => loadGetTurnosPasadosSuccess({ turnos: turnos })),
            catchError((error: any) => of(loadGetTurnosPasadosFailed({ error })))
        ))
    ));

    //loadGetTurnosFromTo
    loadGetTurnosFromTo$ = createEffect(() => this.actions$.pipe(
        ofType(loadGetTurnosFromTo),
        switchMap(({ especialistaId, from, to }) => this.turnosService.getTurnosFromTo(especialistaId, from, to).pipe(
            map((turnos: Turno[]) => loadGetTurnosFromToSuccess({ turnos: turnos })),
            catchError((error) => of(loadGetTurnosFromToFailed({ error })))
        ))
    ));

}
