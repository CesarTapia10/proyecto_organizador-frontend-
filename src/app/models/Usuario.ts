export class Usuario {
    id:number=0


    username:string=""


    email:string=""


    pais:string=""


    password:string=""

    enabled:boolean=true
    

    fecha_registro:Date = new Date(Date.now())

    fecha_modificacion:Date = new Date(Date.now())
}