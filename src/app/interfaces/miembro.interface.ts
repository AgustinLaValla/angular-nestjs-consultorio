import { Especialidad } from './especialidad.interface';
import { Mutual } from './mutual.interface';

export interface Miembro { 
    apellido: string;
    nombre: string;
    especialidad:Especialidad;
    photoURL?: string;
    genero?: 'Masculino' | 'Femenino' | '' ;
    mutualesAdheridas?:Mutual[];
    _id?:string;
}