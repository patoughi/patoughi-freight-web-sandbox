import { NextResponse } from 'next/server';
import bids from '@/data/bids.json';
import type { Bid } from '@/features/shipments/types';

const MIN_BID_RIAL = 100_000;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = (bids as Bid[]).filter(row => row.shipment_id === Number(id));

  return NextResponse.json({ data: rows });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as { amount?: number; note?: string | null };

  await new Promise(resolve => setTimeout(resolve, 500));

  if (typeof body.amount !== 'number' || body.amount < MIN_BID_RIAL) {
    return NextResponse.json(
      { error: 'validation_failed', message: 'The bid amount must be at least 100,000 Rial.' },
      { status: 422 },
    );
  }

  // One in four submissions fails, so error handling is observable.
  if (Math.random() < 0.25) {
    return NextResponse.json(
      { error: 'shipment_closed', message: 'This shipment is no longer accepting bids.' },
      { status: 409 },
    );
  }

  return NextResponse.json(
    {
      data: {
        id: Date.now(),
        shipment_id: Number(id),
        amount: body.amount,
        note: body.note ?? null,
        status: 'pending',
        created_at: new Date().toISOString(),
        driver: { id: 1, name: 'You', vehicle_type: 'truck_10' },
      },
    },
    { status: 201 },
  );
}
