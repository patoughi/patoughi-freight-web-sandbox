/**
 * REVIEW SNIPPET - FRONTEND
 *
 * Shown to the candidate in the last 20 minutes of the session.
 * This file is NOT part of the candidate repository. It does not need to compile.
 *
 * Framing to read out loud:
 *   "A teammate opened this PR for the wallet withdrawal screen. You are the
 *    reviewer. Walk me through it. What would you block on, what would you
 *    leave as a comment, and what would you let through?"
 */

'use client';

import { useEffect, useState } from 'react';

export default function WithdrawalForm(props: any) {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(props.balance);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setBalance(props.balance);
  }, [props.balance]);

  useEffect(() => {
    fetch('/api/v1/financials/bank-cards')
      .then(res => res.json())
      .then(data => {
        setCards(data.data);
        setSelectedCard(data.data[0]);
      });
  }, []);

  useEffect(() => {
    if (amount > balance) {
      document.getElementById('amount-error').style.display = 'block';
    } else {
      document.getElementById('amount-error').style.display = 'none';
    }
  }, [amount]);

  const submit = async () => {
    setSubmitting(true);

    const res = await fetch('/api/v1/financials/withdrawals', {
      method: 'POST',
      body: JSON.stringify({
        bank_card_id: selectedCard.id,
        amount: parseFloat(amount) * 10,
      }),
    });

    const json = await res.json();

    setBalance(balance - amount);
    setSubmitting(false);

    window.location.href = '/profile/financial?success=1';
  };

  return (
    <div>
      <h1>برداشت وجه</h1>
      <p>موجودی قابل برداشت: {(balance / 10).toFixed(2)} تومان</p>

      <select onChange={e => setSelectedCard(cards[e.target.value])}>
        {cards.map((card: any, i) => (
          <option key={i} value={i}>
            {card.bank_name} - {card.pan}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={amount}
        onChange={e => setAmount(e.target.value as any)}
        placeholder="مبلغ"
      />

      <span id="amount-error" style={{ display: 'none', color: 'red' }}>
        مبلغ بیشتر از موجودی است
      </span>

      <button state={amount > 0 ? 'default' : 'disabled'} onClick={submit}>
        ثبت درخواست
      </button>
    </div>
  );
}
