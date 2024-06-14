import { IClient } from '../../clients/interfaces/client-interface';
import { IProduct } from '../../products/interfaces/product-interface';

export interface Invoice {
  id: number;
  fechaEmision: Date;
  codDoc: string;
  claveAcceso: string;
  secuencial: string;
  totalSinImpuestos: number;
  totalDescuento: number;
  propina: number;
  importeTotal: number;
  moneda: string;
  establecimiento: Establecimiento;
  cliente: IClient;
  items: Item[];
  totalImpuestos: Impuesto[];
  pagos: Pago[];
}

export interface Establecimiento {
  id: string;
  ruc: string;
  razonSocial: string;
  dirMatriz: string;
  dirEstablecimiento: string;
  estab: string;
  ptoEmi: string;
  obligadoContabilidad: string;
  ambiente: string;
  activo: boolean;
}

export interface Item {
  id: number;
  cantidad: number;
  descuento: number;
  precioTotalSinImpuesto: number;
  precioUnitario: number;
  producto: IProduct;
  impuesto: Impuesto[];
}

export interface Impuesto {
  id: number;
  codigo: string;
  codigoPorcentaje: string;
  tarifa: string;
  baseImponible: number;
  valor: number;
}

export interface Pago {
  id: number;
  formaPago: string;
  total: number;
}
