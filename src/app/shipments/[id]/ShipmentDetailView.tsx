'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BidBottomSheet } from '@/components/BidBottomSheet';
import { StatusBadge } from '@/components/StatusBadge';
import { useShipment, useShipmentBids } from '@/features/shipments/queries';
import { formatPickupDate, formatToman, formatWeight } from '@/lib/format';

export function ShipmentDetailView({ shipmentId }: { shipmentId: number }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: shipment, isPending, isError } = useShipment(shipmentId);
  const { data: bids } = useShipmentBids(shipmentId);

  if (isPending) {
    return <p className="state">Loading...</p>;
  }

  if (isError || !shipment) {
    return (
      <div className="state state--error">
        <p>Could not load this shipment.</p>
        <Link href="/shipments">Back to list</Link>
      </div>
    );
  }

  return (
    <main className="page">
      <Link href="/shipments" className="back">
        Back
      </Link>

      <header className="detail__head">
        <div className="detail__route">
          {shipment.origin_city} to {shipment.destination_city}
        </div>
        <StatusBadge status={shipment.status} />
      </header>

      <dl className="detail__meta">
        <div>
          <dt>Shipper</dt>
          <dd>{shipment.shipper_name}</dd>
        </div>
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
        <div>
          <dt>Suggested</dt>
          <dd>{formatToman(shipment.suggested_price)}</dd>
        </div>
      </dl>

      <section className="detail__bids">
        <h2 className="section__title">Bids ({bids?.length ?? 0})</h2>
        <ul className="bids">
          {bids?.map(bid => (
            <li key={bid.id} className="bid">
              <div>
                <p className="bid__driver">{bid.driver.name}</p>
                <p className="bid__vehicle">{bid.driver.vehicle_type}</p>
              </div>
              <div className="bid__right">
                <span className="bid__amount">{formatToman(bid.amount)}</span>
                <StatusBadge status={bid.status} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <button className="button button--primary" onClick={() => setSheetOpen(true)}>
        Place a bid
      </button>

      <BidBottomSheet
        shipmentId={shipment.id}
        suggestedPrice={shipment.suggested_price}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  );
}
