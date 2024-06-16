import { QR } from "../interfaces/QR";

export class User {
  public name: string;
  public surname: string;
  public alias: string;
  public correo: string;
  public uid: string;
  public rol: string;
  public creditos: number;
  public QRs: QR[] = [];

  constructor(
    name: string,
    surname: string,
    alias: string,
    correo: string,
    uid: string,
    rol: string,
    creditos: number,
    QRs: QR[]
  ) {
    this.name = name;
    this.surname = surname;
    this.alias = alias;
    this.correo = correo;
    this.uid = uid;
    this.rol = rol; 
    this.creditos = creditos; 
    this.QRs = QRs;
  }
}
