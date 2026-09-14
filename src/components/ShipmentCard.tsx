import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import { formatPickupDate, formatToman, formatWeight } from '@/lib/format';
import type { Shipment } from '@/features/shipments/types';

export function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <Link href={`/shipments/${shipment.id}`} className="card">
      <div className="card__head">
        <div className="card__route">
          <span>{shipment.origin_city}</span>
          <span className="card__arrow">to</span>
          <span>{shipment.destination_city}</span>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <dl className="card__meta">
        <div>
          <dt>Cargo</dt>
          <dd>{shipment.cargo_type}</dd>
        </div>
        <div>
          <dt>Weight</dt>
          <dd>{formatWeight(shipment.weight_kg)}</dd>
        </div>
        <div>
          <dt>Pickup</dt>
          <dd>{formatPickupDate(shipment.pickup_at)}</dd>
        </div>
      </dl>

      <div className="card__foot">
        <span className="card__price">{formatToman(shipment.suggested_price)}</span>
        <span className="card__bids">
          {shipment.bid_count} bids
          {shipment.lowest_bid !== null && ` · from ${formatToman(shipment.lowest_bid)}`}
        </span>
      </div>
    </Link>
  );
}
