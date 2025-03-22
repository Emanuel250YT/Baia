export const formatAmount = (amount: number): string => {
  if (amount >= 1_000_000) {
    return (
      (amount / 1_000_000)
        .toFixed(amount % 1_000_000 === 0 ? 0 : amount % 100_000 === 0 ? 1 : 2)
        .replace(/\.00$/, "") + "M"
    );
  } else {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};
