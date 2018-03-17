export class Cancion {
  constructor(
    public id: number,
    public numero: number,
    public nombre: string,
    public duracion: string,
    public archivo: string,
    public album_id: number
  ) { }
}
