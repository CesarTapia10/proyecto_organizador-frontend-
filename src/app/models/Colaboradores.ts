import { Proyectos } from "./Proyectos";
import { Usuario } from "./Usuario";

export class Colaboradores {
    id: number = 0

    representacion: string = ''

    proyectos:Proyectos= new Proyectos()

    user :Usuario= new Usuario()
}