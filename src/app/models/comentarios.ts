import { Tareas } from "./Tareas";
import { Usuario } from "./Usuario";

export class comentarios {

    id:number = 0

    contenido: string = "";

    fecha_creacion: Date = new Date(Date.now())


    tareas: Tareas= new Tareas()


    user: Usuario= new Usuario()
}