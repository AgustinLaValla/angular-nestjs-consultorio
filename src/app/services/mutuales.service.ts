import { Injectable } from '@angular/core';
import { Mutual } from '../interfaces/mutual.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { HttpClient } from '@angular/common/http';
import { URL } from '../config/config.config';


@Injectable({ providedIn: 'root' })
export class MutualesService {

    constructor(private http: HttpClient, private store:Store<AppState>) { };

    getMutuales(): Observable<Mutual[]> {
        return this.http.get(`${URL}/mutuales`).pipe(map(resp => resp['mutuales']));
    };

    addMutual(mutual: Mutual): Observable<Mutual> {
        return this.http.post(`${URL}/mutuales/create`, mutual).pipe(map(resp => resp['mutual']));
    };

    updateMutual(mutual: Mutual): Observable<Mutual> {
        return this.http.put(`${URL}/mutuales/update/${mutual._id}`, mutual).pipe(map(resp => resp['mutual']));
    };

    deleteMutual(mutualId: string): Observable<any> {
        return this.http.delete(`${URL}/mutuales/delete/${mutualId}`);
    };

};