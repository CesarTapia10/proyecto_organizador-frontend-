import { Proyectos } from "./Proyectos";
import { Tareas } from "./Tareas";

export class ProyectosconTareas {
    id: number = 0;

    fecha_creacion: Date = new Date(Date.now());

    fecha_modifiacion: Date = new Date(Date.now());

    proyectos: Proyectos= new Proyectos();

    tareas:Tareas= new Tareas();
}