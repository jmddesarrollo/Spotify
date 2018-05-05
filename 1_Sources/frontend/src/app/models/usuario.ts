export class Usuario {
  constructor(
    public id: number,
    public apellidos: string,
    public nombre: string,
    public email: string,
    public contrasenha: string,
    public rol: string,
    public imagen: string
  ){}
}
