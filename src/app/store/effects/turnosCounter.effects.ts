import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { loadGetTurnosCounter, loadGetTurnosCounterSuccess, loadGetTurnosCounterFailed, loadGetTurnosConcretadosLength, loadGetTurnosConcretadosLengthSuccess, loadGetTurnosConcretadosLengthFailed } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TurnosCounterEffect {
    constructor(private action$: Actions, private turnosService: TurnosService) { }

    //Turnos Counter Effects
    getTurnosCounter$ = createEffect(() => this.action$.pipe(
        ofType(loadGetTurnosCounter),
        switchMap(({ especialistaId }) => this.turnosService.getTurnosCounterValue(especialistaId).pipe(
            map(({ counter }) => loadGetTurnosCounterSuccess({ totalTurnos: counter })),
            catchError((error: any) => of(loadGetTurnosCounterFailed({ error })))
        ))
    ));

    //Turnos Concretados Length Effecrs
    getTurnosConcretadosLength$ = createEffect(() => this.action$.pipe(
        ofType(loadGetTurnosConcretadosLength),
        switchMap(({ especialistaId }) => this.turnosService.getTurnosConcretadosLength(especialistaId).pipe(
            map((counter) => loadGetTurnosConcretadosLengthSuccess({ totalTurnos: counter })),
            catchError((error: any) => of(loadGetTurnosConcretadosLengthFailed({ error })))
        ))
    ));

}