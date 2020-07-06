export interface Especialidad {
    nombreEspecialidad: string;
    servicios: Servicio[];
    _id?: string;
}

export interface Servicio {
    nombre:string;
    _id?: any;
};