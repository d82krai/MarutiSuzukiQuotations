import { CarModel, CarVariant } from './car.model';

export interface Quotation {
  id: string;
  quotationNumber: string;
  date: Date;
  customerName: string;
  address: string;
  contactNo: string;
  salesmanName: string;
  salesmanContact: string;
  model: CarModel;
  variants: CarVariant[];
  consumerOffer: number;
  retailSupport: number;
  ruralOffer: number;
  exchangeBonus: number;
  oldCarPrice: number;
  [key: string]: any; // Add index signature for dynamic property access
}