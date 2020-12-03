import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getTurnos, getShowCalendar, getEspecialistId, getMiembro, getIsLoading } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno.interface';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment/moment';
import { DateRangeInput } from '@fullcalendar/core/datelib/date-range';
import { deactivateLoading, loadGetMiembro } from 'src/app/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { TurnosDialogComponent } from '../turnos-dialog/turnos-dialog.component';
import { isNullOrUndefined } from 'util';
import { Miembro } from 'src/app/interfaces/miembro.interface';
import es from '@fullcalendar/core/locales/es';
import { tap, filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {

  public es = es;

  private showCalendarSubs$ = new Subscription();
  public show: boolean = false;

  private especialistIdSubs$ = new Subscription();
  public especialistaId: string;

  private turnosSubs$ = new Subscription();
  public turnos: Turno[] = [];

  private miembroSubs$ = new Subscription();
  public miembro: Miembro;

  private loadingSubs$ = new Subscription();
  public loading: boolean = false;

  public calendarPlugins = [dayGridPlugin, timeGrigPlugin];
  public calendarEvents: EventInput[] = [];
  public validRange: DateRangeInput = { start: this.getStartRange(), end: this.getEndRange() };

  public calendarHeader: Object;
  public calendardefaultView: string;

  private calendarChanges$ = new Subscription();

  @ViewChildren('calendar') calendarChildren: QueryList<FullCalendarComponent>;
  @ViewChild('calendar') calendarChild: FullCalendarComponent;


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getEspecialistaId();
    this.getTurnos();
    this.showOrHideCalendar();
    this.miembroSubs$ = this.store.select(getMiembro).subscribe((miembro: Miembro) => this.miembro = miembro);
    this.loadingSubs$ = this.store.select(getIsLoading).subscribe(loading => this.loading = loading);
  }

  ngAfterViewInit() {
    this.setCalendarProperties(window.innerWidth);
    this.setMobileDefaultView();
  }

  showOrHideCalendar() {
    this.showCalendarSubs$ = this.store.select(getShowCalendar).subscribe(show => this.show = show);
  };

  getTurnos() {
    this.turnosSubs$ = this.store.select(getTurnos).pipe(
      tap(() => this.store.dispatch(deactivateLoading())),
      tap((turnos) => {
        if (isNullOrUndefined(turnos) || turnos.length == 0) {
          this.store.dispatch(loadGetMiembro({ id: this.especialistaId }));
        };
      }),
      filter((turnos) => !isNullOrUndefined(turnos)),
      map((turnos) => {
        this.calendarEvents = [];
        this.turnos = turnos;
        turnos.forEach(turno => {
          const title = `${turno.nombre} ${turno.apellido}`;
          const eventDesdeYear = moment(turno.desde).clone().year();
          const eventDesdeMonth = moment(turno.desde).clone().month();
          const eventDesdeDate = moment(turno.desde).clone().date();
          const eventDesdeHour = moment(turno.desde).utc().clone().hour();
          const eventDesdeMinutes = moment(turno.desde).utc().clone().minutes();


          const eventHastaYear = moment(turno.hasta).clone().year();
          const eventHastaMonth = moment(turno.hasta).clone().add().month();
          const eventHastaDate = moment(turno.hasta).clone().add().date();
          const eventHastaHour = moment(turno.hasta).utc().clone().hour();
          const eventHastaMinutes = moment(turno.hasta).utc().clone().minutes();

          const eventDate: EventInput = {
            id: turno._id,
            title,
            start: new Date(eventDesdeYear, eventDesdeMonth, eventDesdeDate, eventDesdeHour, eventDesdeMinutes),
            end: new Date(eventHastaYear, eventHastaMonth, eventHastaDate, eventHastaHour, eventHastaMinutes),
            backgroundColor: new Date(eventDesdeYear, eventDesdeMonth, eventDesdeDate, eventDesdeHour, eventDesdeMinutes) < new Date() ? '#f44336 ' : '#9c27b0',
            borderColor: 'transparent',
            overlap: true,
            className: 'slotStyles'
          };

          this.calendarEvents = [...this.calendarEvents, eventDate];
        });
      })
    ).subscribe();
  };

  getEspecialistaId() {
    this.store.select(getEspecialistId).pipe(
      filter(especialistaId => !isNullOrUndefined(especialistaId)),
      map(especialistaId => this.especialistaId = especialistaId)
    ).subscribe();
  };

  openDialog(event) {
    const turno = this.turnos.find(turno => turno._id === event.event.id);
    this.dialog.open(TurnosDialogComponent, {
      data: { action: 'Editar Turno', especialistaId: this.especialistaId, turno }
    });
  };


  getStartRange() {
    const year = moment().year();
    const month = (moment().add(1, 'month').month() < 10) ? `0${moment().add(1, 'month').month()}` : moment().add(1, 'month').month();
    const date = moment().date() < 10 ? `0${moment().date()}` : moment().date();
    return `${year}-${month}-${date}`;
  };

  getEndRange() {

    const year = moment().add(1, 'year').year();

    let currentMonth = moment().add(1, 'month').month();

    const month = currentMonth === 0 ? '01' :
      currentMonth < 10
        ? `0${currentMonth}`
        : currentMonth;

    const date = moment().date() < 10 ? `0${moment().date()}` : moment().date();
    console.log(`${year}-${month}-${date}`);
    return `${year}-${month}-${date}`;
  };

  @HostListener('window:resize', ['$event'])
  changeCalendarHeader(event) {
    this.setCalendarProperties(event.target.innerWidth);
  }

  setCalendarProperties(innerWidth: number) {
    if (innerWidth > 539) {
      this.calendardefaultView = 'dayGridMonth';
      this.calendarHeader = {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }
    } else {
      this.calendardefaultView = 'timeGridDay';
      this.calendarHeader = {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay'
      }

      if (this.calendarChild) {
        this.calendarChild.getApi().changeView('timeGridDay');
      }
    }
  }

  setMobileDefaultView() {
    this.calendarChanges$ = this.calendarChildren.changes.subscribe(calend => {

      if (this.renderer.selectRootElement(window).innerWidth < 540) {
        calend.first.getApi().changeView('timeGridDay');

      }
    });
  }

  ngOnDestroy(): void {
    this.turnosSubs$.unsubscribe();
    this.showCalendarSubs$.unsubscribe();
    this.especialistIdSubs$.unsubscribe();
    this.miembroSubs$.unsubscribe();
    this.loadingSubs$.unsubscribe();
    this.calendarChanges$.unsubscribe();
  };

};