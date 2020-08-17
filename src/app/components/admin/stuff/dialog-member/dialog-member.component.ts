import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState, getEspecialidades, getMiembro, getMutuales } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { loadAddMiembro, loadGetEspecialidades, deactivateLoading, loadGetMiembro, loadResetMiembro, loadUpdateMiembro, loadGetMutuales } from 'src/app/store/actions';
import { Subscription } from 'rxjs';
import { Mutual } from 'src/app/interfaces/mutual.interface';
import { tap, map, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-dialog-member',
  templateUrl: './dialog-member.component.html',
  styleUrls: ['./dialog-member.component.css']
})
export class DialogMemberComponent implements OnInit, OnDestroy {

  public new_miembro: Miembro = {
    apellido: '',
    nombre: '',
    especialidad: {nombreEspecialidad:'', servicios: [], _id:null},
    mutualesAdheridas: [],
    genero: '',
  }
  private miembroSubs$ = new Subscription();

  public image: string | ArrayBuffer = null;
  public loadingImage: boolean = false;
  public imageLoaded: boolean = false;


  private especialidadesSubs = new Subscription();
  public especialidades: Especialidad[] = [];

  private obrasSocialesSubs$ = new Subscription();
  public obras_sociales: Mutual[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, id?: string },
    private store: Store<AppState>,
    private alertsService:AlertsService
    ) {

    this.getEspecialidades();
    this.getMiembro();
    this.getObrasSociales();
    this.store.dispatch(loadGetEspecialidades());
    if (data.id) {
      this.store.dispatch(loadGetMiembro({ id: data.id }))
    };
    this.store.dispatch(loadGetMutuales());
  };

  ngOnInit() { }

  getEspecialidades() {
    this.especialidadesSubs = this.store.select(getEspecialidades).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(especialidades => !isNullOrUndefined(especialidades)),
      map(especialidades => this.especialidades = especialidades)
    ).subscribe();
  };

  getMiembro() {
    this.miembroSubs$ = this.store.select(getMiembro).pipe(
      filter(miembro => !isNullOrUndefined(miembro)),
      map(miembro => this.new_miembro = miembro)
    ).subscribe(console.log);
  };

  getObrasSociales() {
    this.obrasSocialesSubs$ = this.store.select(getMutuales).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      filter(mutuales => !isNullOrUndefined(mutuales)),
      map(mutuales=> this.obras_sociales = mutuales)
    ).subscribe(console.log);
  };

  addMiembro() {
    this.store.dispatch(loadAddMiembro({ miembro: this.new_miembro, image: this.image }));
    this.image = null;
    this.dialogRef.close();
  };

  updateMiembro() {
    this.store.dispatch(loadUpdateMiembro({ miembro: this.new_miembro, image: this.image }));
    this.dialogRef.close();
  };

  loadImage(image:File) {
    this.loadingImage = true;
    this.imageLoaded = false;

    if(!image) return

    if (image.type.indexOf('image') >= 0) {

      const reader = new FileReader();
      reader.onloadend = () => this.image = reader.result;
      reader.readAsDataURL(image);

      this.loadingImage = false;
      this.imageLoaded = true;
    } else {
      this.alertsService.showWarningService('Acción no permitida', 'Solo se pueden subir imágenes');
    };
  };

  compareWith(mutuales1:any, mutuales2:any) {
    return mutuales1 && mutuales2 && mutuales1._id === mutuales2._id;
  };

  ngOnDestroy(): void {
    this.store.dispatch(loadResetMiembro())
    this.especialidadesSubs.unsubscribe();
    this.miembroSubs$.unsubscribe();
    this.obrasSocialesSubs$.unsubscribe();
  };

}
