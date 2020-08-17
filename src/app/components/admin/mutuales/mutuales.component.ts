import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getMutuales, getIsLoading, getMutualesError } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { deactivateLoading, loadGetMutuales, loadDeleteMutual } from 'src/app/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { MutualesDialogComponent } from './mutuales-dialog/mutuales-dialog.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, filter, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-mutuales',
  templateUrl: './mutuales.component.html',
  styleUrls: ['./mutuales.component.css']
})
export class MutualesComponent implements OnInit, OnDestroy {

  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  private mutualesSubs$ = new Subscription();
  public mutuales: Mutual[] = [];

  private errorSubs$ = new Subscription();

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private alertsService: AlertsService
  ) {
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
    this.getMutuales();
    this.handleErrors();
    this.matIconRegistry.addSvgIcon('medical_tag', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/medical-tag.svg'));
  }

  ngOnInit() {
    this.store.dispatch(loadGetMutuales());
  }

  getMutuales() {
    this.mutualesSubs$ = this.store.select(getMutuales).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(mutuales => !isNullOrUndefined(mutuales)),
      map(mutuales => this.mutuales = mutuales)
    ).subscribe();
  };

  openDialog(message: string, mutual?: Mutual) {
    this.loadingSubs$.unsubscribe();

    const dialogRef = this.dialog.open(MutualesDialogComponent, {
      data: { message: message, mutual }
    });

    this.loadingSubs$ = dialogRef.afterClosed().pipe(
      switchMap(() => this.store.select(getIsLoading)),
      map((loading) => this.loading = loading)
    ).subscribe();
  };

  deleteMutual(mutualId: string) {
    this.store.dispatch(loadDeleteMutual({ mutualId }));
  };

  handleErrors() {
    this.errorSubs$ = this.store.select(getMutualesError).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(error => !isNullOrUndefined(error)),
      tap(error => {
        if(error.status === 422) {
          this.alertsService.showErrorAlert('Nombre repetido', error.error.message);
        } else { 
          this.alertsService.showErrorAlert(error.name, error.statusText);
        }
        this.store.dispatch(loadGetMutuales());
        
      })
    ).subscribe();
  };

  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
    this.mutualesSubs$.unsubscribe();
    this.errorSubs$.unsubscribe();
  };

}
