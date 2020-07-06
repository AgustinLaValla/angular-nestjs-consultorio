import { Injectable } from '@angular/core';
import { Pacient } from '../interfaces/pacient.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as moment from 'moment';
import { AlertsService } from './alerts.service';
import { HttpClient } from '@angular/common/http';
import { URL } from '../config/config.config';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientsService {

  private currentDate: number;

  constructor(private http: HttpClient) {
    this.currentDate = moment().startOf('day').unix();
  }


  getPacientsColl(counter: number): Observable<Pacient[]> {
    return this.http.get(`${URL}/pacients/get-pacients/${counter}`).pipe(map(resp => resp['pacients']));
  };

  getPacientsCounter(): Observable<number> {
    return this.http.get(`${URL}/pacients/counter`).pipe(map(resp => resp['counter']));
  };

  getSinglePacient(pacientId: string): Observable<Pacient> { 
    return this.http.get(`${URL}/pacients/get-pacient/${pacientId}`).pipe(map(resp => resp['pacient']));
  };

  updatePacient(newPacientData: Pacient):Observable<Pacient> { 
    return this.http.put(`${URL}/pacients/update`, this.setBody(newPacientData)).pipe(map(resp => resp['pacient']));
  };

  deletePacient(pacient: Pacient) { 
    return this.http.delete(`${URL}/pacients/${pacient._id}`);
  }
 
  getPacientByLastname(value: string): Observable<Pacient[]> {
    return this.http.get(`${URL}/pacients/search/${value}`).pipe(map(resp => resp['pacient']));
   }


  getPacientByDNI(dni: string):Observable<Pacient> { 
    return this.http.get(`${URL}/pacients/get-pacient-by-dni/${dni}`).pipe(map(resp => resp['pacient']));
  };

  setBody(pacient:Pacient) {
    return { ...pacient, obraSocial:pacient.obraSocial._id };
  }

}
