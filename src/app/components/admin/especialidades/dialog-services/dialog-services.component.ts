import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidad, Servicio } from 'src/app/interfaces/especialidad.interface';
import { Store } from '@ngrx/store';
import { AppState, getIsLoading, getEspecialidad, getEspecialidadError } from 'src/app/store/app.reducer';
import { loadAddEspecialidad, deactivateLoading } from 'src/app/store/actions';
import { loadGetEspecialidad, loadAddServicio, loadDeleteServicio, loadUpdateServicio } from 'src/app/store/actions/especialidad.action';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-dialog-services',
  templateUrl: './dialog-services.component.html',
  styleUrls: ['./dialog-services.component.css']
})
export class DialogServicesComponent implements OnInit, OnDestroy {

  public especialidad: Especialidad;
  public nuevaEspecialidad: Especialidad = {
    nombreEspecialidad: '',
    servicios: []
  }
  public newServicio: string;
  public selectedServicio: Servicio = { nombre: '', _id: '' };


  public loading: boolean = false;
  public edit: boolean = false;

  private loadingSubs$ = new Subscription();
  private especialidadSubs$ = new Subscription();


  constructor(
    public dialogRef: MatDialogRef<DialogServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, id: string },
    private store: Store<AppState>,
    private matIconRegistry: MatIconRegistry,
    private domSanatizer: DomSanitizer,
  ) {

    this.matIconRegistry.addSvgIcon('stethoscope-medical-tool',
      this.domSanatizer.bypassSecurityTrustResourceUrl('assets/icons/stethoscope-medical-tool.svg')
    )
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe((loading: boolean) => this.loading = loading);
    this.getEspecialidad();
    
    if (data.id) {
      this.store.dispatch(loadGetEspecialidad({ id: data.id }));
    };
  };

  ngOnInit() { }

  getEspecialidad() {
    this.especialidadSubs$ = this.store.select(getEspecialidad).pipe(
      tap(console.log),
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(especialidad => !isNullOrUndefined(especialidad)),
      map(especialidad => this.especialidad = especialidad)
    ).subscribe()
  }

  addNewServicio() {
    this.store.dispatch(loadAddServicio({ id: this.especialidad._id, value: this.newServicio }));
    this.newServicio = '';
  };

  editServicio(id: number | string) {
    this.selectedServicio = { ...this.especialidad.servicios[id] };
    this.edit = true;
    document.getElementById(`${id}`).style.display = 'inline-block';
    document.getElementById(`${id}`).style.position = 'absolute';
    document.getElementById(`input${id}`).focus();
    document.getElementById(`item${id}`).style.display = 'none';
    document.getElementById(`icon${id}`).style.display = 'none';
  };

  updateServicio(i: number) {
    if (this.selectedServicio._id === this.especialidad.servicios[i]._id &&
      this.selectedServicio.nombre !== this.especialidad.servicios[i].nombre) {
      this.store.dispatch(loadUpdateServicio({
        id: this.especialidad._id,
        servicioId: this.especialidad.servicios[i]._id,
        newValue: this.selectedServicio.nombre,
      }));
    };
    this.cancelEditServicio(i);
  };

  cancelEditServicio(id: number) {
    document.getElementById(`${id}`).style.display = 'none';
    document.getElementById(`item${id}`).style.display = 'inline-block';
    document.getElementById(`icon${id}`).style.display = 'inline-block';
    this.selectedServicio = this.especialidad.servicios[id];
  };


  deleteServicio(i: number) {
    this.store.dispatch(loadDeleteServicio({ id: this.especialidad._id, servicioId: this.especialidad.servicios[i]._id },))
  };


  addEspecialidad() {
    this.store.dispatch(loadAddEspecialidad({ newEspecialidad: this.nuevaEspecialidad }));
    this.dialogRef.close();
  };


  ngOnDestroy(): void {
    this.loadingSubs$.unsubscribe();
    this.especialidadSubs$.unsubscribe();
  };

};
