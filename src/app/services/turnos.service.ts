import { Injectable } from '@angular/core';
import { Turno } from '../interfaces/turno.interface';
import { map, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getUpdatedFromPacientSection } from '../store/app.reducer';
import { activateLoading, loadCloseDialog, showProgressBar } from '../store/actions';
import * as moment from 'moment';
import { Counter } from '../interfaces/counter.interface';
import { HttpClient } from '@angular/common/http';
import { URL } from '../config/config.config';
import { isNullOrUndefined } from 'util';

@Injectable({ providedIn: 'root' })
export class TurnosService {

    public turnoUpdatedFromPacientSection:boolean;

    private currentDate: number;

    private currentMonth: number;
    private currentEndMonth: number;

    constructor(private store: Store<AppState>, private http: HttpClient) {

        this.currentDate = moment().startOf('day').unix();
        this.currentMonth = moment().startOf('month').unix();
        this.currentEndMonth = moment().endOf('month').unix();
        
        this.getTurnoUpdatedFromPacientSectionValue();

    }


    getMiembroTurnos(especialistaId: string, count: number = 15): Observable<Turno[]> {
        this.store.dispatch(activateLoading());
        if (count === 0) count = 15;
        return this.http.get(`${URL}/turnos/get-turnos/${especialistaId}/${count}`).pipe(map(resp => resp['turnos']));
    }

    getSingleTurno(turnoId: string): Observable<Turno> {
        this.store.dispatch(activateLoading());
        return this.http.get(`${URL}/turnos/get-turno/:${turnoId}`).pipe(map(resp => resp['turno']));
    };

    addTurno(turno: Turno): Observable<Turno> {
        this.store.dispatch(activateLoading());
        return this.http.post(`${URL}/turnos/add-turno`, this.setBody(turno)).pipe(
            tap(() => this.store.dispatch(loadCloseDialog({ close: true }))),
            map(resp => resp['turno']));
    };


    updateTurno(turno: Turno): Observable<Turno> {

        this.store.dispatch(activateLoading());
        return this.http.put(`${URL}/turnos/update-turno`, this.setBody(turno)).pipe(
            tap(() => this.store.dispatch(loadCloseDialog({ close: true }))),
            map(resp => resp['turno']))
    };

    //delete Single Turno
    deleteSingleTurno(turno: Turno): Observable<Turno> {
        this.store.dispatch(activateLoading());
        return this.http.delete(`${URL}/turnos/${turno._id}`).pipe(map(resp => resp['turno']));
    };


    //GET TURNOS COUNTER VALUE
    getTurnosCounterValue(especialistaId: string): Observable<Counter> {
        return this.http.get(`${URL}/turnos/turnos-counter/${especialistaId}`).pipe(map(resp => {
            const counter = { counter: resp['counter'] } as Counter
            return counter;
        }));
    };

    //GET TURNOS CONCRETADOS LENGTH
    getTurnosConcretadosLength(especialistaId: string): Observable<number> {
        return this.http.get(`${URL}/turnos/turnos-concretados-counter/${especialistaId}`).pipe(map(resp => resp['counter']));
    };

    //Search Turno By Pacient Name
    GetTurnoByPacientLastName(especialistaId: string, value: string, tableType: 'Especialistas' | 'Turnos Pasados') {
        return this.http.get(`${URL}/turnos/search/${especialistaId}/${value}`).pipe(map(resp => {
            if (tableType == 'Especialistas') {
                return resp['turnos'].filter((turno: Turno) => turno.dateInSeconds >= this.currentDate);
            } else if (tableType == 'Turnos Pasados') {
                return resp['turnos'].filter((turno: Turno) => turno.dateInSeconds < this.currentDate)
            };
        }));
    };

    getOldTurnos(especialistaId: string, count: number): Observable<Turno[]> {
        this.store.dispatch(activateLoading());
        return this.http.get(`${URL}/turnos/old-turnos/${especialistaId}/${count}`).pipe(map(resp => resp['turnos']));
    };


    getTurnosFromTo(especialistaId: string, from: number = this.currentMonth, to: number = this.currentEndMonth): Observable<Turno[]> {
        this.store.dispatch(showProgressBar());
        return this.http.get(`${URL}/turnos/from-to/${especialistaId}/${from}/${to}`).pipe(map(resp => resp['turnos']));
    };


    setBody(turno: Turno) {
        return {
            ...turno,
            consulta: turno.consulta['_id'], 
            obraSocial: turno.obraSocial._id, 
            especialistaId: turno.especialistaId['_id'] ? turno.especialistaId['_id'] : turno.especialistaId
        };
    }

    getTurnoUpdatedFromPacientSectionValue() {
        this.store.select(getUpdatedFromPacientSection).pipe(
            filter(value => !isNullOrUndefined(value)),
            map(value => this.turnoUpdatedFromPacientSection = value)
        ).subscribe(console.log);
    }


};

