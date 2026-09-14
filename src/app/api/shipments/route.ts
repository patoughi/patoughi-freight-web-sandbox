import { NextResponse } from 'next/server';
import shipments from '@/data/shipments.json';
import type { Shipment } from '@/features/shipments/types';

const PER_PAGE = 6;

/**
 * Stands in for the real backend. Deliberately supports a single `origin_city`
 * value, exactly like the upstream API does.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const originCity = searchParams.get('origin_city');
  const cargoType = searchParams.get('cargo_type');
  const page = Number(searchParams.get('page') ?? '1');

  let rows = shipments as Shipment[];

  if (originCity) {
    rows = rows.filter(row => row.origin_city === originCity);
  }

  if (cargoType) {
    rows = rows.filter(row => row.cargo_type === cargoType);
  }

  const lastPage = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;

  // Simulated network latency, so loading states are visible.
  await new Promise(resolve => setTimeout(resolve, 350));

  return NextResponse.json({
    data: rows.slice(start, start + PER_PAGE),
    meta: {
      current_page: page,
      last_page: lastPage,
      total: rows.length,
    },
  });
}
