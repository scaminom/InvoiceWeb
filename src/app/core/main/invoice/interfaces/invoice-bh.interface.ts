export interface Pago {
  formaPago: string;
}

export interface Item {
  cantidad: number;
  descuento: number;
  idProducto: number;
}

export interface Invoice {
  propina: number;
  pagos: Pago;
  items: Item[];
  idCliente: number;
  idEstablecimiento: number;
}

export interface Establishment {
  id: string;
  ruc: string;
  razonSocial: string;
}

export interface IClient {
  id: number;
  identificacionComprador: string;
  razonSocialComprador: string;
}

export interface IProduct {
  id: number;
  codigoPrincipal: string;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
}

export interface ItemResponse {
  id: string;
  cantidad: number;
  descuento: number;
  product: IProduct;
}
