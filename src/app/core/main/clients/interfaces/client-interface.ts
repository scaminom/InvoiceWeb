import { IdentificationType } from '../enums/tipo-identificacion.enum';

export interface IClient {
  id: number;
  identificacionComprador: string;
  tipoIdentificacion: IdentificationType;
  razonSocialComprador: string;
  direccionComprador: string;
  correo: string;
}
