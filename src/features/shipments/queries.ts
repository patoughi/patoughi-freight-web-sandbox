'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch, buildQueryString } from '@/lib/api-client';
import type { Bid, Paginated, Shipment, ShipmentFilters } from './types';

export const shipmentKeys = {
  all: ['shipments'] as const,
  list: (filters: ShipmentFilters) => ['shipments', 'list', filters] as const,
  detail: (id: number) => ['shipments', 'detail', id] as const,
  bids: (id: number) => ['shipments', 'bids', id] as const,
};

export function useShipments(filters: ShipmentFilters) {
  return useQuery({
    queryKey: shipmentKeys.all,
    queryFn: () =>
      apiFetch<Paginated<Shipment>>(
        `/shipments${buildQueryString({
          origin_city: filters.origin_city,
          cargo_type: filters.cargo_type,
          page: filters.page,
        })}`,
      ),
  });
}

export function useShipment(id: number) {
  return useQuery({
    queryKey: shipmentKeys.detail(id),
    queryFn: () => apiFetch<{ data: Shipment }>(`/shipments/${id}`),
    select: response => response.data,
  });
}

export function useShipmentBids(id: number) {
  return useQuery({
    queryKey: shipmentKeys.bids(id),
    queryFn: () => apiFetch<{ data: Bid[] }>(`/shipments/${id}/bids`),
    select: response => response.data,
  });
}

interface PlaceBidInput {
  shipmentId: number;
  amount: number;
  note?: string;
}

export function usePlaceBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shipmentId, amount, note }: PlaceBidInput) =>
      apiFetch<{ data: Bid }>(`/shipments/${shipmentId}/bids`, {
        method: 'POST',
        body: JSON.stringify({ driver_id: 1, amount, note }),
      }),
    onSuccess: (_result, variables) => {
      void queryClient.invalidateQueries({ queryKey: shipmentKeys.bids(variables.shipmentId) });
      void queryClient.invalidateQueries({ queryKey: shipmentKeys.detail(variables.shipmentId) });
    },
  });
}
