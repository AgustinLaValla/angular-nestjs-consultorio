import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map, tap } from 'rxjs/operators';
import { Miembro } from '../interfaces/miembro.interface';
import { Observable } from 'rxjs';
import { activateLoading } from '../store/actions';
import { URL } from '../config/config.config';
import { HttpClient } from '@angular/common/http';
import { Mutual } from '../interfaces/mutual.interface';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  getStuff(): Observable<Miembro[]> {
    this.store.dispatch(activateLoading())
    return this.http.get(`${URL}/stuff`).pipe(map(result => result['stuff']));
  }

  addMiembro(miembro: Miembro, image?: string | ArrayBuffer): Observable<Miembro> {
    const body = this.setBody(miembro, image);
    return this.http.post(`${URL}/stuff/add-miembro`, body).pipe(map(resp => resp['miembro']));
  }

  getMiembro(id: string): Observable<Miembro> {
    return this.http.get(`${URL}/stuff/${id}`).pipe(map(resp => resp['miembro']));
  }

  updateMiembro(miembro: Miembro, image?: string | ArrayBuffer): Observable<Miembro> {
    const body = this.setBody(miembro, image);
    return this.http.put(`${URL}/stuff/update/${miembro._id}`, body).pipe(tap(console.log),map(resp => resp['miembro']));
  }

  deleteMiembro(id: string): Observable<Object> {
    return this.http.delete(`${URL}/stuff/${id}`);
  }

  setBody(miembro:Miembro, image?:string | ArrayBuffer) {
    return image ? { ...miembro, especialidad:miembro.especialidad._id, mutualesAdheridas: this.getMutualesIds(miembro.mutualesAdheridas),image }
                 : { ...miembro, especialidad:miembro.especialidad._id, mutualesAdheridas: this.getMutualesIds(miembro.mutualesAdheridas) }
  }

  getMutualesIds(mutuales:Mutual[]):string[] {
    return mutuales.map(mutual => mutual._id);
  };

}
