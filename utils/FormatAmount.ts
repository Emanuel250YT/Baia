export const formatAmount = (amount: number): string => {
  const roundedAmount = Math.round(amount);
  if (roundedAmount >= 1_000_000) {
    return (
      (roundedAmount / 1_000_000)
        .toFixed(roundedAmount % 1_000_000 === 0 ? 0 : roundedAmount % 100_000 === 0 ? 1 : 2)
        .replace(/\.00$/, "") + "M"
    );
  } else {
    return roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};
