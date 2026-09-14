'use client';

import { useState } from 'react';
import { usePlaceBid } from '@/features/shipments/queries';
import { ApiError } from '@/lib/api-client';
import { formatToman } from '@/lib/format';

const MIN_BID_RIAL = 100_000;

interface Props {
  shipmentId: number;
  suggestedPrice: number;
  open: boolean;
  onClose: () => void;
}

export function BidBottomSheet({ shipmentId, suggestedPrice, open, onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  const placeBid = usePlaceBid();

  if (!open) {
    return null;
  }

  const parsedAmount = Number(amount.replace(/,/g, ''));
  const isValid = Number.isFinite(parsedAmount) && parsedAmount >= MIN_BID_RIAL;

  const handleSubmit = () => {
    setError(null);

    placeBid.mutate(
      { shipmentId, amount: parsedAmount, note: note || undefined },
      {
        onSuccess: () => {
          setAmount('');
          setNote('');
          onClose();
        },
        onError: cause => {
          setError(cause instanceof ApiError ? cause.message : 'Something went wrong.');
        },
      },
    );
  };

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={event => event.stopPropagation()}>
        <h2 className="sheet__title">Place a bid</h2>
        <p className="sheet__hint">Shipper suggested {formatToman(suggestedPrice)}</p>

        {error && <p className="sheet__error">{error}</p>}

        <label className="field">
          <span className="field__label">Your price (Rial)</span>
          <input
            className="field__input"
            inputMode="numeric"
            value={amount}
            onChange={event => setAmount(event.target.value)}
            placeholder="45000000"
          />
        </label>

        <label className="field">
          <span className="field__label">Note (optional)</span>
          <textarea
            className="field__input"
            rows={2}
            value={note}
            onChange={event => setNote(event.target.value)}
          />
        </label>

        <button className="button" data-state={isValid ? 'default' : 'disabled'} onClick={handleSubmit}>
          {placeBid.isPending ? 'Sending...' : 'Submit bid'}
        </button>
      </div>
    </div>
  );
}
