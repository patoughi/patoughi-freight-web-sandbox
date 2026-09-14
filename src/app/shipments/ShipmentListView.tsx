'use client';

import { useState } from 'react';
import { ShipmentCard } from '@/components/ShipmentCard';
import { useShipments } from '@/features/shipments/queries';

export function ShipmentListView() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useShipments({ page });

  return (
    <main className="page">
      <header className="page__head">
        <h1 className="page__title">Available loads</h1>
        <p className="page__subtitle">
          {data ? `${data.meta.total} open shipments` : 'Loading shipments'}
        </p>
      </header>

      {isPending && <p className="state">Loading...</p>}

      {isError && (
        <div className="state state--error">
          <p>{error instanceof Error ? error.message : 'Could not load shipments.'}</p>
        </div>
      )}

      {data && data.data.length === 0 && <p className="state">No shipments match right now.</p>}

      <div className="list">
        {data?.data.map(shipment => <ShipmentCard key={shipment.id} shipment={shipment} />)}
      </div>

      {data && data.meta.last_page > 1 && (
        <nav className="pager">
          <button className="button button--ghost" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span className="pager__label">
            Page {data.meta.current_page} of {data.meta.last_page}
          </span>
          <button
            className="button button--ghost"
            disabled={page >= data.meta.last_page}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}
