import { Injectable } from '@angular/core';
import { StuffService } from 'src/app/services/stuff.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadGetMiembro, loadGetMiembroSuccess, loadGetMiembroFailed, loadUpdateMiembro, loadUpdateMiembroSuccess, loadUpdateMiembroFailed } from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Miembro } from 'src/app/interfaces/miembro.interface';

@Injectable()
export class MiembroEffects {
    constructor(private action$: Actions, private stuffService: StuffService) { }

    //Get Miembro
    loadGetMiembro$ = createEffect(() => this.action$.pipe(
        ofType(loadGetMiembro),
        map(({ id }) => id),
        switchMap((id) => this.stuffService.getMiembro(id).pipe(
            map((miembro: Miembro) => loadGetMiembroSuccess({ miembro: miembro })),
            catchError((error: any) => of(loadGetMiembroFailed({ error })))
        ))
    ))
}