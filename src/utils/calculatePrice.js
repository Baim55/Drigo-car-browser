const SERVICE_FEE = 15;

export function calculatePrice(pricePerDay, days) {
  if (!pricePerDay || !days || days <= 0) {
    return { rentalCost: 0, serviceFee: SERVICE_FEE, total: SERVICE_FEE };
  }
  const rentalCost = pricePerDay * days;
  const total = rentalCost + SERVICE_FEE;
  return { rentalCost, serviceFee: SERVICE_FEE, total };
}
