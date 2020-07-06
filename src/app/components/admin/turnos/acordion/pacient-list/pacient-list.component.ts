import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getPacientsCounter, getReloadPacientList } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { Pacient } from 'src/app/interfaces/pacient.interface';
import { loadGetPacients, showPacientData, loadGetPacientByLastname, hidePacientData, loadResetPacientList, unsubscribeLoading, loadReoloadPacientList } from 'src/app/store/actions';
import { filter, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit, OnDestroy {

  @Input() public pacientList: Pacient[];
  @Input() public count: number;

  private pacientsCounterSubs$ = new Subscription();
  public pacientsCounter: number;

  private reloadPacientList$ = new Subscription();

  constructor(private store: Store<AppState>) {
    this.getPacientsCounter();
    this.reloadPacientListListener();
  }

  ngOnInit() { }

  getPacientsCounter() {
    this.pacientsCounterSubs$ = this.store.select(getPacientsCounter).pipe(
      tap(console.log),
      map((pacientsCounter) => pacientsCounter ? this.pacientsCounter = pacientsCounter : this.pacientsCounter = 0)
    ).subscribe();
  }

  reloadPacientListListener() {
    this.reloadPacientList$ = this.store.select(getReloadPacientList).pipe(
      filter(reload => !isNullOrUndefined(reload)),
      tap((reload) => {
        if (reload) {
          this.store.dispatch(loadGetPacients({ count: this.count }));
          this.store.dispatch(loadReoloadPacientList({ reload: false }));
        };
      })
    ).subscribe();
  }

  openPacientTable(pacienteId: string) {
    this.store.dispatch(showPacientData({ pacientId: pacienteId }));
    this.store.dispatch(unsubscribeLoading());
  }


  applyFilter(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value;
    const { keyCode } = event;
    const keyCodeQuery = keyCode != 16 && keyCode != 17 && keyCode != 20 && keyCode != 18 && keyCode != 91 && keyCode != 93 && 220;

    if (query != '' && keyCodeQuery) {
      this.store.dispatch(loadGetPacientByLastname({ value: query }));
    } else if (query == '' && keyCodeQuery) {
      this.store.dispatch(loadGetPacients({ count: this.count }));
      this.store.dispatch(hidePacientData());
    }
  }

  loadMorePacients() {
    this.count += 5;
    this.store.dispatch(loadGetPacients({ count: this.count }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(loadResetPacientList());
    this.pacientsCounterSubs$.unsubscribe();
    this.reloadPacientList$.unsubscribe();
  }

}
