export type ShipmentStatus = 'open' | 'assigned' | 'cancelled';

export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Shipment {
  id: number;
  shipper_name: string;
  origin_city: string;
  destination_city: string;
  cargo_type: string;
  weight_kg: number;
  /** Rial, integer */
  suggested_price: number;
  pickup_at: string;
  status: ShipmentStatus;
  bid_count: number;
  /** Rial, integer. Null when no pending bid exists. */
  lowest_bid: number | null;
}

export interface Bid {
  id: number;
  shipment_id: number;
  /** Rial, integer */
  amount: number;
  note: string | null;
  status: BidStatus;
  created_at: string;
  driver: {
    id: number;
    name: string;
    vehicle_type: string;
  };
}

export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface ShipmentFilters {
  origin_city?: string;
  cargo_type?: string;
  page?: number;
}
