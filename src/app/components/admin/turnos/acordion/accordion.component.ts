import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getPacientes, getPacientesError } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { loadGetPacients, loadGetPacientsCounter, deactivateLoading } from 'src/app/store/actions';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit, OnDestroy {

  private pacientesSubs$ = new Subscription();
  public pacientList: Pacient[];
  public count: number;

  private errorSubs$ = new Subscription();

  constructor(private store: Store<AppState>, private alertsService: AlertsService) {
    this.getOPacients()
    this.handleErrors();

    this.count = 5;

    this.store.dispatch(loadGetPacients({ count: this.count }));
    this.store.dispatch(loadGetPacientsCounter());
  }

  ngOnInit() {
  }

  getOPacients() {
    this.pacientesSubs$ = this.store.select(getPacientes).pipe(
      filter(pacientes => !isNullOrUndefined(pacientes)),
      map(pacientes => this.pacientList = pacientes)
    ).subscribe();
  }

  handleErrors() {
    this.errorSubs$ = this.store.select(getPacientesError).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(error => !isNullOrUndefined(error)),
      tap(error => this.alertsService.showErrorAlert(error.name, error.code))
    ).subscribe();
  };


  ngOnDestroy(): void {
    this.pacientesSubs$.unsubscribe();
    this.errorSubs$.unsubscribe();
  }


}
