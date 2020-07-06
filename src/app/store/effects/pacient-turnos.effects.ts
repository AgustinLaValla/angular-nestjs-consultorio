import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PacientsService } from 'src/app/services/pacients.service';
import { loadDeleteTurnoFromPacientSection, loadDeleteSingleTurnoSuccess, loadDeleteSingleTurnoFailed, loadDeleteTurnoFromPacientSectionSuccess } from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TurnosService } from 'src/app/services/turnos.service';

@Injectable()
export class PacientTurnosEffect {

    constructor(private action$: Actions, private turnosService: TurnosService) { }

    loadDeleteTurnoFromPacientSection$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteTurnoFromPacientSection),
        switchMap(({ especialistaId, turno }) => this.turnosService.deleteSingleTurno(turno).pipe(
            switchMap(() => [loadDeleteSingleTurnoSuccess({ turnoId: turno._id }),
                             loadDeleteTurnoFromPacientSectionSuccess({ turno })
                            ]),
            catchError(error => of(loadDeleteSingleTurnoFailed({ error })))
        ))
    ));

}