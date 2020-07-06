import { Injectable } from '@angular/core';
import { Especialidad, Servicio } from '../interfaces/especialidad.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { activateLoading } from '../store/actions';
import { HttpClient } from '@angular/common/http';
import { URL } from '../config/config.config';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public docId: string;
  public serviciosArray: string[] = []

  constructor(private store: Store<AppState>, private http: HttpClient) {  }


  //ESPECIALIDAD FUNCTIONS
  getEspecialidades(): Observable<Especialidad[]> {
    this.store.dispatch(activateLoading());
    return this.http.get(`${URL}/especialidades`).pipe(map(resp => resp['especialidades']));
  }

  getEspecialidad(id: string): Observable<Especialidad> {
    this.store.dispatch(activateLoading())
    return this.http.get(`${URL}/especialidades/${id}`).pipe(map(resp => resp['especialidad']));
  }

  addEspecialidad(newEspecialidad: Especialidad):Observable<Especialidad> {

    return this.http.post(`${URL}/especialidades/create`, newEspecialidad).pipe(map(resp => resp['especialidad']));
  }


  deleteEspecialidad(id: string, ): Observable<any> {
    return this.http.delete(`${URL}/especialidades/delete/${id}`);

  }

  //SERVICIOS FUNCTIONS
  addNewServicio(id: string, servicioName: string):Observable<Servicio> {
    return this.http.put(`${URL}/especialidades/create-servicio/${id}`, {servicioName, especialidadId:id})
                    .pipe(map(resp => resp['servicio']));
  }

  deleteServicio(id: string, servicioId: string): Observable<any> {
    return this.http.delete(`${URL}/especialidades/delete-servicio/${id}/${servicioId}`);
  }

  updateSerivico(id: string, servicioId:string ,newValue: string) {
    return this.http.put(`${URL}/especialidades/update-servicio/${id}`, {servicioId, newValue, especialidadId:id});
  }


}

