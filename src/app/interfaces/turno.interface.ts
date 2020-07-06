import * as moment from 'moment'
import { Mutual } from './mutual.interface';
import { Servicio } from './especialidad.interface';

export interface Turno {
    nombre:string;
    apellido:string;
    obraSocial: Mutual ;
    numeroDeAfiliado?:string;
    telefono?:string;
    desde: moment.Moment | string;
    hasta: moment.Moment | string;
    consulta?: Servicio;
    diagnostico?:string;
    _id?: string;
    dni:string;
    dateInSeconds: number;
    especialistaId?:string;
    nacimiento?: string;
    nacimientoSeconds?: number;
}