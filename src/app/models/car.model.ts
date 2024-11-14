export interface CarModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  variants: CarVariant[];
}

export interface CarVariant {
  id: string;
  name: string;
  exShowroomPrice: number;
  rto: number;
  insurance: number;
  tcs: number;
  extendedWarranty: number;
  ccp: number;
  accessories: number;
  rewardProgram: number;
  fastag: number;
  imageUrl: string;
  // Technical specifications
  rating: number;
  reviews: number;
  transmission: string;
  engine: string;
  fuelType: string;
  power: string;
  bootSpace: string;
  airbags: number;
}