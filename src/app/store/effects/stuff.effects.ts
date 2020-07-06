import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StuffService } from 'src/app/services/stuff.service';
import {
    loadGetStuffSuccess, loadGetStuffFailed, loadDeleteMiembro, loadDeleteMiembroSuccess, loadDeleteMiembroFailed, loadGetStuff,
    loadAddMiembro, loadAddMiembroSuccess, loadAddMiembroFailed, loadUpdateMiembro, loadUpdateMiembroSuccess, loadUpdateMiembroFailed
} from '../actions/stuff.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { of } from 'rxjs';

@Injectable()
export class StuffEffect {
    constructor(private action$: Actions,
        private stuffService: StuffService) { }

    //Get Stuff Effect
    loadGetStuff$ = createEffect(() => this.action$.pipe(
        ofType(loadGetStuff),
        switchMap((action) => this.stuffService.getStuff().pipe(
            map((stuff: Miembro[]) => loadGetStuffSuccess({ stuff: stuff })),
            catchError((error: any) => of(loadGetStuffFailed({ error })))
        ))
    ))

    //Update Miembro Effect
    loadUpdateMiembro$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateMiembro),
        switchMap(({ miembro, image }) => this.stuffService.updateMiembro(miembro, image).pipe(
            map(miembro => loadUpdateMiembroSuccess({ miembro })),
            catchError(error => of(loadUpdateMiembroFailed({ error })))
        ))
    ))

    //Add Miembro Effect
    loadAddMiembro$ = createEffect(() => this.action$.pipe(
        ofType(loadAddMiembro),
        switchMap(({ miembro, image }) => this.stuffService.addMiembro(miembro, image).pipe(
            map((miembroUpdated) => loadAddMiembroSuccess({ miembro:miembroUpdated })),
            catchError((error: any) => of(loadAddMiembroFailed({ error })))
        ))
    ))

    //Delete Miembro Effect
    loadDeleteMiebro$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteMiembro),
        switchMap(({ id }) => this.stuffService.deleteMiembro(id).pipe(
            map(() => loadDeleteMiembroSuccess({ id })),
            catchError((error: any) => of(loadDeleteMiembroFailed({ error })))
        ))
    ))
}