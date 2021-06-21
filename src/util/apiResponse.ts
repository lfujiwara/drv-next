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
  paid?: string;
};

export type MultiTripSummary = {
  total: TripSummary;
  paid: TripSummary;
  unpaid: TripSummary;
};

export type TripSummary = {
  count: number;
  fareSum: number;
  fareAvg: number;
  distanceAvg: number;
  distanceSum: number;
};

export type CustomerPendingSummary = {
  count: number;
  total: number;
  from: string;
  monthsWithPendingTrips: string[];
};
