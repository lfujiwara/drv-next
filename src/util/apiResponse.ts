export type Paged<T> = {
  values: T[];
  skip: number;
  take: number;
};

export type CustomerData = {
  id: number;
  name: string;
  phoneNumber: string;
};

export type TripData = {
  id: number;
  customerId: number;
  customer?: CustomerData;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  fare: number;
  obs: string;
};

export type TripSummary = {
  count: number;
  fareSum: number;
  fareAvg: number;
  distanceAvg: number;
  distanceSum: number;
};
