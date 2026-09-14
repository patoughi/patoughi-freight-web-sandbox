import { NextResponse } from 'next/server';
import shipments from '@/data/shipments.json';
import type { Shipment } from '@/features/shipments/types';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shipment = (shipments as Shipment[]).find(row => row.id === Number(id));

  if (!shipment) {
    return NextResponse.json({ error: 'not_found', message: 'Shipment not found.' }, { status: 404 });
  }

  return NextResponse.json({ data: shipment });
}
