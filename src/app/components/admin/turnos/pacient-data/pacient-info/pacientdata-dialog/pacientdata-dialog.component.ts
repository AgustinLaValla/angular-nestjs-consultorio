import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { Store } from '@ngrx/store';
import { AppState, getMutuales, getClosePacientDataDialog, getPacientError } from 'src/app/store/app.reducer';
import { loadUpdateSinglePacientInfo, loadGetMutuales, cleanPacientDataError, closePacientDataDialog } from 'src/app/store/actions';
import * as moment from 'moment';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { filter, map, tap } from 'rxjs/operators';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-pacientdata-dialog',
  templateUrl: './pacientdata-dialog.component.html',
  styleUrls: ['./pacientdata-dialog.component.css']
})
export class PacientdataDialogComponent implements OnInit, OnDestroy {

  public pacient: Pacient;
  public pacientBackUp: Pacient;
  public nacimiento: moment.Moment;

  public maxDate = moment();

  private mutualesSubs$ = new Subscription();
  public mutuales: Mutual[] = [];

  private showDialogSubs$ = new Subscription();

  private pacientErrorHandler$ = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<PacientdataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pacientInfo: Pacient },
    private store: Store<AppState>,
    private alertsService: AlertsService
  ) {
    this.store.dispatch(loadGetMutuales());
  }

  ngOnInit() {
    const { pacientInfo } = this.data;
    this.pacientBackUp = { ...pacientInfo };
    this.pacient = pacientInfo;
    this.nacimiento = moment(pacientInfo.nacimiento).utc().clone();

    this.getMutuales();
    this.pacientErrorHandler();
    this.closeDialogListener();
  };

  getMutuales() {
    this.mutualesSubs$ = this.store.select(getMutuales).pipe(
      filter(mutuales => !isNullOrUndefined(mutuales)),
      map(mutuales => this.mutuales = mutuales)
    ).subscribe();
  }

  closeDialogListener() {
    this.showDialogSubs$ = this.store.select(getClosePacientDataDialog).pipe(
      filter(close => !isNullOrUndefined(close)),
      tap((close) => {
        if(close) {
          this.dialogRef.close();
          this.store.dispatch(closePacientDataDialog({close:false}));
        };
      })
    ).subscribe(console.log);
  }

  pacientErrorHandler() {
    this.pacientErrorHandler$ = this.store.select(getPacientError).pipe(
      filter(error => !isNullOrUndefined(error)),
      tap((error) => {
        if (error.status === 422) {
          this.alertsService.showErrorAlert('Error', error.error.message);
          this.pacient.dni = this.pacientBackUp.dni;
        };
      }),
      tap(() => this.store.dispatch(cleanPacientDataError()))
    ).subscribe()
  }

  chosenYearHandler(year: moment.Moment) {
    this.nacimiento = moment().year(year.year());
  };

  chosenMonthHandler(month: moment.Moment) {
    this.nacimiento = moment(this.pacient.nacimiento).month(month.month());
  };


  saveChanges() {
    if (JSON.stringify(this.pacient) != JSON.stringify(this.pacientBackUp)) {
      this.store.dispatch(loadUpdateSinglePacientInfo({ newPacientData: this.pacient }));
    };
  };

  checkFechaDeNacimiento() {
    const { pacientInfo } = this.data;

    if (moment(this.nacimiento).utc().unix() != pacientInfo.nacimientoSeconds) {
      this.pacient.nacimiento = this.nacimiento.toString();
      this.pacient.nacimientoSeconds = moment(this.nacimiento).clone().unix();
    };
  };

  compareMutuals(mutual1: any, mutual2: any): boolean {
    return mutual1 && mutual2 && mutual1._id === mutual2._id
  }

  ngOnDestroy(): void {
    this.mutualesSubs$.unsubscribe();
    this.showDialogSubs$.unsubscribe();
    this.pacientErrorHandler$.unsubscribe();
  };

};
