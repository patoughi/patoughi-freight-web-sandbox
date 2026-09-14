import type { BidStatus, ShipmentStatus } from '@/features/shipments/types';

const LABELS: Record<ShipmentStatus | BidStatus, string> = {
  open: 'Open',
  assigned: 'Assigned',
  cancelled: 'Cancelled',
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};

const TONES: Record<ShipmentStatus | BidStatus, string> = {
  open: 'badge badge--green',
  assigned: 'badge badge--blue',
  cancelled: 'badge badge--grey',
  pending: 'badge badge--amber',
  accepted: 'badge badge--green',
  rejected: 'badge badge--grey',
  withdrawn: 'badge badge--grey',
};

export function StatusBadge({ status }: { status: ShipmentStatus | BidStatus }) {
  return <span className={TONES[status]}>{LABELS[status]}</span>;
}
