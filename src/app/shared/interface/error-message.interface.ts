export interface ErrorMessage {
  message: string;
  description: string[];
  code: number;
  time: Date;
}


export interface ErroSRI {
  estado: string;
  claveFactura: string;
  mensanje: string[];
}