import { Usuario } from "./Usuario";

export class Tareas {
    id: number = 0;

    titulo: string = "";

    descripcion: string = "";

    estado: string = "";

    fecha_limite:Date= new Date(Date.now());

    fecha_creacion:Date= new Date(Date.now());

    fecha_actualizacion:Date= new Date(Date.now());

    user: Usuario= new Usuario();
}