import * as moment from 'moment';
import { Mutual } from './mutual.interface';
import { Turno } from './turno.interface';

export interface Pacient {
    nombre?:string;
    apellido?:string;
    dni:string;
    obraSocial?: Mutual 
    numeroDeAfiliado?:string;
    telefono?:string;
    _id?: string;
    nacimiento?:moment.Moment | string;
    nacimientoSeconds?: number; 
    turnos?:Turno[];
}