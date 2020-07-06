import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { loadGetEspecialidad, loadGetEspecialidadSuccess, loadGetEspecialidadFailed, loadAddServicio, loadAddServicioSuccess, loadAddServicioFailed, loadDeleteServicio, loadDeleteServicioFailed, loadUpdateServicio, loadUpdateServicioSuccess, loadUpdateServicioFailed, loadGetEspecialidadByItsName, loadGetEspecialidadByItsNameSuccess, loadGetEspecialidadByItsNameFailed, loadDeleteServicioSuccess } from '../actions/especialidad.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { of } from 'rxjs';

@Injectable()
export class EspecialidadEffects {
    constructor(private action$: Actions, private especialidadesService: EspecialidadesService) { }

    //GetEspecialidad Effect
    loadGetEspecialidad$ = createEffect(() => this.action$.pipe(
        ofType(loadGetEspecialidad),
        switchMap(({ id }) => this.especialidadesService.getEspecialidad(id).pipe(
            map((especialidad: Especialidad) => loadGetEspecialidadSuccess({ especialidad: especialidad })),
            catchError((error: any) => of(loadGetEspecialidadFailed({ error })))
        ))
    ));

    //Add Servicio Effect
    loadAddServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadAddServicio),
        switchMap(({ id, value }) => this.especialidadesService.addNewServicio(id, value).pipe(
            map((servicio) => loadAddServicioSuccess({ servicio })),
            catchError((error: any) => of(loadAddServicioFailed({ error })))
        ))
    ));

    //Delete Servicio Effect
    loadDeleteServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadDeleteServicio),
        switchMap(({ id, servicioId }) => this.especialidadesService.deleteServicio(id, servicioId).pipe(
            map(() => loadDeleteServicioSuccess({ servicioId: servicioId })),
            catchError((error) => of(loadDeleteServicioFailed({ error })))
        ))
    ))

    //Update Servicio Effect
    loadUpdateServicio$ = createEffect(() => this.action$.pipe(
        ofType(loadUpdateServicio),
        switchMap(({id ,servicioId, newValue}) => this.especialidadesService.updateSerivico(id, servicioId,newValue).pipe(
            map(() =>  loadUpdateServicioSuccess({servicioId, newValue})),
            catchError((error: any) => of(loadUpdateServicioFailed({ error })))
        ))
    ))

}