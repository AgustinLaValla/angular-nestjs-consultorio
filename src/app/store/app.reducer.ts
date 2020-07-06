import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromEspecialidades from './reducers/especialidades.reducer';
import * as fromUI from './reducers/ui.reducer';
import * as fromESPECIALIDAD from './reducers/especialidad.reducer';
import * as fromSTUFF from './reducers/stuff.reducer';
import * as fromMIEMBRO from './reducers/miembro.reducer';
import * as fromTURNOS_DATA from './reducers/turnos-data.reducer';
import * as fromTURNOS from './reducers/turnos.reducer';
import * as fromTURNO from './reducers/turno.reducer';
import * as fromTURNOS_COUNTER from './reducers/turnosCounter.reducer';
import * as fromTABLE from './reducers/table.reducer';
import * as fromPACIENTES from './reducers/pacientes.reducer';
import * as fromPACIENTE_TURNOS from './reducers/pacient-turnos.reducer';
import * as fromPACIENT_TABLE from './reducers/pacient-table.reducer';
import * as fromPACIENT_DATA from './reducers/pacient-data.reducer';
import * as fromPACIENT from './reducers/paciente.reducer';
import * as fromAUTH from './reducers/auth.reducer';
import * as fromDIALOG from './reducers/dialog.reducer';
import * as fromCALENDAR from './reducers/calendar.reducer';
import * as fromSTATISTICS from './reducers/statistics.reducer';
import * as fromMUTUALES from './reducers/mutuales.reducer';
import * as fromPROGRES_BAR from './reducers/progress-bar.reducer';

export interface AppState {
    ui: fromUI.UI_State,
    especialidades: fromEspecialidades.EspecialidadesState,
    especialidad: fromESPECIALIDAD.EspecialidadState,
    stuff: fromSTUFF.StuffState,
    miembro: fromMIEMBRO.MiembroState,
    turnos: fromTURNOS.TurnosState,
    turnos_data: fromTURNOS_DATA.TurnosDataState,
    table: fromTABLE.TableState,
    turno: fromTURNO.TurnoState,
    total_turnos: fromTURNOS_COUNTER.TurnosCounterState,
    pacientes: fromPACIENTES.PacientesState,
    paciente_turnos: fromPACIENTE_TURNOS.Pacient_Turnos,
    pacient_table: fromPACIENT_TABLE.PacientTable,
    pacient_data: fromPACIENT_DATA.PacientDataState,
    pacient: fromPACIENT.PacientState,
    auth: fromAUTH.AuthState,
    dialog: fromDIALOG.DialogState,
    calendar: fromCALENDAR.CalendarState,
    statistics: fromSTATISTICS.StatisticsState,
    mutuales: fromMUTUALES.MutualesState,
    progress_bar: fromPROGRES_BAR.ProgressBarState
};

export const appReducer: ActionReducerMap<AppState> = {
    especialidades: fromEspecialidades.especialidadesReducer,
    ui: fromUI.uiReducer,
    especialidad: fromESPECIALIDAD.especialidadReducer,
    stuff: fromSTUFF.stuffReducer,
    miembro: fromMIEMBRO.miembroReducer,
    turnos: fromTURNOS.turnosReducer,
    table: fromTABLE.tableReducer,
    turno: fromTURNO.turnoReducer,
    turnos_data: fromTURNOS_DATA.turnosDataReducer,
    total_turnos: fromTURNOS_COUNTER.turnosCounterReducer,
    pacientes: fromPACIENTES.pacientesReducer,
    paciente_turnos: fromPACIENTE_TURNOS.pacientTurnosReducer,
    pacient_table: fromPACIENT_TABLE.pacientTableReducer,
    pacient_data: fromPACIENT_DATA.pacientDataReducer,
    pacient: fromPACIENT.pacientReducer,
    auth: fromAUTH.authReducer,
    dialog: fromDIALOG.dialogReducer,
    calendar: fromCALENDAR.calendarReducer,
    statistics: fromSTATISTICS.statisticsReducer,
    mutuales: fromMUTUALES.mutualReducer,
    progress_bar: fromPROGRES_BAR.progressBarReducer
};

//SELECTORS
//ui selectors
export const loadingFeature = (state: AppState) => state.ui;
export const getIsLoading = createSelector(loadingFeature, (state: fromUI.UI_State) => state.loading);
export const getUnsubsLoading = createSelector(loadingFeature, (state: fromUI.UI_State) => state.unsubscribeLoding);
//Especialidades selectors
export const especialidadesFeature = (state:AppState) => state.especialidades;
export const getEspecialidades = createSelector(especialidadesFeature, fromEspecialidades.getEspecialidadesSelector);
export const getEspecialidadesError = createSelector(especialidadesFeature, fromEspecialidades.getEspecialidadesErrorSelector);
//Especialidad selectors
export const especialidadFeature = (state: AppState) => state.especialidad;
export const getEspecialidad = createSelector(especialidadFeature, (state: fromESPECIALIDAD.EspecialidadState) => state.especialidad);
export const getEspecialidadError = createSelector(especialidadFeature, (state: fromESPECIALIDAD.EspecialidadState) => state.error);
//Stuff selectors
export const stuffFeature = (state:AppState) => state.stuff
export const getStuff = createSelector(stuffFeature, fromSTUFF.getStuffSelector);
export const getStuffError = createSelector(stuffFeature, fromSTUFF.getStuffErrorSelector);
//Miembro Selectors
export const miembroFeature = (state:AppState) => state.miembro;
export const getMiembro = createSelector(miembroFeature, fromMIEMBRO.getMiembroSelector);
export const getMiembroError = createSelector(miembroFeature, fromMIEMBRO.getMiembroErrorSelector)
//Turnos Selectors
export const turnosFeature = (state: AppState) => state.turnos;
export const getTurnos = createSelector(turnosFeature, (state: fromTURNOS.TurnosState) => state.turnos);
export const getIsFiltering = createSelector(turnosFeature, (state: fromTURNOS.TurnosState) => state.isFiltering);
export const getTurnosError = createSelector(turnosFeature, (state: fromTURNOS.TurnosState) => state.error);
//Turnos Data Selector
export const turnosDataFeature = (state: AppState) => state.turnos_data;
export const getShowTurnosData = createSelector(turnosDataFeature, (state: fromTURNOS_DATA.TurnosDataState) => state.show);
export const getEspecialistId = createSelector(turnosDataFeature, (state: fromTURNOS_DATA.TurnosDataState) => state.especialistaId);
//Table selectors
export const tableFeature = (state:AppState) => state.table
export const openTable = createSelector(tableFeature, fromTABLE.openTableSelector);
export const getId = createSelector(tableFeature, fromTABLE.idSelector);
export const getCounter = createSelector(tableFeature, fromTABLE.counterSelector);
export const getBackgroundLayer = createSelector(tableFeature, fromTABLE.backgroundLayerSelector);
export const getTableType = createSelector(tableFeature, fromTABLE.tableTyoeSelector);
//Single Turno Selectors
export const turnoFeature = (state:AppState) => state.turno;
export const getSingleTurno = createSelector(turnoFeature, fromTURNO.getSingleTurnoSelector);
export const getSingleTurnoError = createSelector(turnoFeature, fromTURNO.getSingleTurnoErrorSelector);
//Turnos Counter Selector
export const totalTurnosFeature = (state:AppState) => state.total_turnos;
export const getTurnosCounter = createSelector(totalTurnosFeature, fromTURNOS_COUNTER.turnosCounterSelector);
export const getTurnosConcretadosLength = createSelector(totalTurnosFeature, fromTURNOS_COUNTER.turnosConcretadosSelector);
//Pacientes Selector
export const pacientesFeature = (state: AppState) => state.pacientes;
export const getPacientes = createSelector(pacientesFeature, fromPACIENTES.pacientesSelector);
export const getPacientesError = createSelector(pacientesFeature, fromPACIENTES.pacientesErrorSelector);
export const getPacientsCounter = createSelector(pacientesFeature, fromPACIENTES.pacientesCounterSelector);
export const getReloadPacientList = createSelector(pacientesFeature, fromPACIENTES.pacientListReloadProperty);
//Paciente Turnos Selector
export const pacienteTurnosFeature = (state: AppState) => state.paciente_turnos;
export const getPacienteTurnos = createSelector(pacienteTurnosFeature, fromPACIENTE_TURNOS.pacientSelector);
export const getUpdatedFromPacientSection = createSelector(pacienteTurnosFeature, fromPACIENTE_TURNOS.updatedFromPacientSec);
export const getPacienteTurnosError = createSelector(pacienteTurnosFeature, fromPACIENTE_TURNOS.pacientErrorSelector);
//Pacient Table Selector
export const pacientTableFeature = (state:AppState) => state.pacient_table;
export const open_pacient_table = createSelector(pacientTableFeature, fromPACIENT_TABLE.openPacientTableSelector);
//Pacient Data Selector
export const pacientDataFeature = (state: AppState) => state.pacient_data;
export const getPacientData = createSelector(pacientDataFeature, fromPACIENT_DATA.pacientDataSelector);
export const getPacientDataId = createSelector(pacientDataFeature, fromPACIENT_DATA.pacientDataIdSelector);
export const getClosePacientDataDialog = createSelector(pacientDataFeature, (state: fromPACIENT_DATA.PacientDataState) => state.closePacientDataDialog);
//Pacinet Selector
export const pacientFeature = (state: AppState) => state.pacient;
export const getPacient = createSelector(pacientFeature, (state: fromPACIENT.PacientState) => state.pacient);
export const getPacientError = createSelector(pacientFeature, (state: fromPACIENT.PacientState) => state.error);
//Auth Selector
export const authFeature = (state: AppState) => state.auth;
export const getIsAuth = createSelector(authFeature, (state: fromAUTH.AuthState) => state.isAuthenticated);
//Dialog Selector
export const dialogFeature = (state: AppState) => state.dialog;
export const getCloseDialog = createSelector(dialogFeature, (state: fromDIALOG.DialogState) => state.close);
//Calendar Selector
export const calendarFeature = (state: AppState) => state.calendar;
export const getShowCalendar = createSelector(calendarFeature, (state: fromCALENDAR.CalendarState) => state.show);
//Statistics Selectors
export const statisticsFeature = (state: AppState) => state.statistics;
export const showStatistics = createSelector(statisticsFeature, (state: fromSTATISTICS.StatisticsState) => state.show);
export const getSpecialistId = createSelector(statisticsFeature, (state: fromSTATISTICS.StatisticsState) => state.especialistaId);
//Mutuales Selectors
export const mutualesFeature = (state: AppState) => state.mutuales;
export const getMutuales = createSelector(mutualesFeature, (state: fromMUTUALES.MutualesState) => state.mutuales);
export const getMutualesError = createSelector(mutualesFeature, (state: fromMUTUALES.MutualesState) => state.error);
//Progress Bar Selector
export const progressBarFeature = (state: AppState) => state.progress_bar;
export const getShowProgressBar = createSelector(progressBarFeature, (state: fromPROGRES_BAR.ProgressBarState) => state.show);