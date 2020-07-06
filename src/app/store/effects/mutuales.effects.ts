import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MutualesService } from '../../services/mutuales.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadGetMutuales, loadGetMutualesSuccess, loadGetMutualesFailed, loadAddMutual, loadAddMutualFailed, loadUpdateMutual, loadDeleteMutual, loadAddMutualSuccess, loadUpdateMutualSuccess, loadUpdateMutualFailed, loadDeleteMutualFailed, loadDeleteMutualSuccess } from '../actions';
import { Mutual } from 'src/app/interfaces/mutual.interface';


@Injectable()
export class MutualesEffects {
    constructor(private action$: Actions, private mutualesService: MutualesService) { }

    loadGetMutuales$ = createEffect(() => this.action$.pipe(
        ofType(loadGetMutuales),
        switchMap(() => this.mutualesService.getMutuales().pipe(
            map((mutuales: Mutual[]) => loadGetMutualesSuccess({ mutuales })),
            catchError(error => of(loadGetMutualesFailed({ error })))
        ))
    ));

    loadAddMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadAddMutual),
        switchMap(({ mutual }) => this.mutualesService.addMutual(mutual).pipe(
            map(newMutual => loadAddMutualSuccess({ mutual: newMutual })),
            catchError(error => of(loadAddMutualFailed({error})))
        ))
    ))

    loadUpdateMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateMutual),
        switchMap(({ mutual }) => this.mutualesService.updateMutual(mutual).pipe(
            map((mutual) => loadUpdateMutualSuccess({mutual})),
            catchError(error => of(loadUpdateMutualFailed({error})))
        ))
    ));

    loadDeleteMutual$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteMutual),
        switchMap(({ mutualId }) => this.mutualesService.deleteMutual(mutualId).pipe(
            map(() => loadDeleteMutualSuccess({mutualId})),
            catchError(error => of(loadDeleteMutualFailed({error})))
        ))
    ));

};