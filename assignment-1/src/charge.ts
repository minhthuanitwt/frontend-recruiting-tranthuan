export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'COUPON'|'CASH';
  percentage?: number;
  amount?: number;
};

function applyCouponPayment(payment: Payment, total: number, deposit: number): number {
  if (payment.percentage != null) {
    deposit += Math.floor(total * (payment.percentage / 100));
  } else {
    deposit += payment.amount || 0;
  }
  return deposit;
}

function applyNonCouponPayment(payment: Payment, total: number, deposit: number): number {
  if (deposit >= total) {
    throw new Error('OverCharge');
  }

  deposit += payment.amount || 0;
  return deposit;
}

export function charge(invoice: Invoice, payments: Payment[]): Receipt {
  const total = invoice.total;
  let deposit = 0;
  let isCoupon = true;

  payments
   .sort((payment) => (payment.type !== 'CASH' ? -1 : 1))
   .forEach((payment) => {
      if (payment.type === 'COUPON') {
        deposit = applyCouponPayment(payment, total, deposit);
      } else {
        isCoupon = false;
        deposit = applyNonCouponPayment(payment, total, deposit);
      }
    });

  if (total > deposit) {
    throw new Error('Shortage');
  }

  if (isCoupon) {
    return { total, deposit, change: 0 };
  }

  return { total, deposit, change: deposit - total };
}