import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { loadHiddeStatistics } from 'src/app/store/actions';
import { UiService } from 'src/app/services/ui.service';
import { CurrentPage } from 'src/app/utils/current-page.enum';

@Component({
  selector: 'app-estadisticas-y-facturacion',
  templateUrl: './estadisticas-y-facturacion.component.html',
  styleUrls: ['./estadisticas-y-facturacion.component.css']
})
export class EstadisticasYFacturacionComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.uiService.currentPage.next(CurrentPage.STATISTICS);
  }

  ngOnDestroy() {
    this.store.dispatch(loadHiddeStatistics());
  };
};
